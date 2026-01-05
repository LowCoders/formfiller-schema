/**
 * PerformanceMonitor Tests
 *
 * Tests for performance monitoring functionality
 */

import { PerformanceMonitor, createPerformanceMonitor } from '../../core/PerformanceMonitor.js';

describe('PerformanceMonitor', () => {
  let monitor: PerformanceMonitor;

  beforeEach(() => {
    monitor = createPerformanceMonitor();
  });

  describe('Synchronous Measurement', () => {
    it('should measure function execution time', () => {
      const result = monitor.measure('test-operation', () => {
        return 42;
      });

      expect(result).toBe(42);

      const stats = monitor.getStats('test-operation');
      expect(stats).toBeDefined();
      expect(stats!.count).toBe(1);
      expect(stats!.avgDuration).toBeGreaterThan(0);
    });

    it('should measure multiple operations', () => {
      monitor.measure('op1', () => 1);
      monitor.measure('op1', () => 2);
      monitor.measure('op1', () => 3);

      const stats = monitor.getStats('op1');
      expect(stats!.count).toBe(3);
    });
  });

  describe('Async Measurement', () => {
    it('should measure async function execution time', async () => {
      const result = await monitor.measureAsync('async-op', async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return 'done';
      });

      expect(result).toBe('done');

      const stats = monitor.getStats('async-op');
      expect(stats!.avgDuration).toBeGreaterThan(9);
    });
  });

  describe('Manual Measurement', () => {
    it('should support manual start/stop', () => {
      const stop = monitor.start('manual-op');

      // Simulate some work
      let sum = 0;
      for (let i = 0; i < 1000; i++) {
        sum += i;
      }

      stop();

      const stats = monitor.getStats('manual-op');
      expect(stats).toBeDefined();
      expect(stats!.count).toBe(1);
    });

    it('should support manual recording', () => {
      monitor.record('custom-op', 123.45);

      const stats = monitor.getStats('custom-op');
      expect(stats!.avgDuration).toBe(123.45);
      expect(stats!.minDuration).toBe(123.45);
      expect(stats!.maxDuration).toBe(123.45);
    });
  });

  describe('Statistics', () => {
    beforeEach(() => {
      monitor.record('test-op', 10);
      monitor.record('test-op', 20);
      monitor.record('test-op', 30);
    });

    it('should calculate average duration', () => {
      const stats = monitor.getStats('test-op');
      expect(stats!.avgDuration).toBe(20);
    });

    it('should track min and max', () => {
      const stats = monitor.getStats('test-op');
      expect(stats!.minDuration).toBe(10);
      expect(stats!.maxDuration).toBe(30);
    });

    it('should track total duration', () => {
      const stats = monitor.getStats('test-op');
      expect(stats!.totalDuration).toBe(60);
    });

    it('should track last duration', () => {
      const stats = monitor.getStats('test-op');
      expect(stats!.lastDuration).toBe(30);
    });
  });

  describe('All Statistics', () => {
    it('should return all operations sorted by avg duration', () => {
      monitor.record('fast', 5);
      monitor.record('slow', 50);
      monitor.record('medium', 25);

      const allStats = monitor.getAllStats();

      expect(allStats).toHaveLength(3);
      expect(allStats[0].operation).toBe('slow');
      expect(allStats[2].operation).toBe('fast');
    });
  });

  describe('Reporting', () => {
    it('should generate text report', () => {
      monitor.record('operation', 10);

      const report = monitor.getReport();

      expect(report).toContain('Performance Report');
      expect(report).toContain('operation');
      expect(report).toContain('Count:');
      expect(report).toContain('Avg:');
    });

    it('should handle empty report', () => {
      const report = monitor.getReport();
      expect(report).toContain('No performance data');
    });
  });

  describe('Reset', () => {
    it('should reset specific operation', () => {
      monitor.record('op1', 10);
      monitor.record('op2', 20);

      monitor.reset('op1');

      expect(monitor.getStats('op1')).toBeNull();
      expect(monitor.getStats('op2')).toBeDefined();
    });

    it('should reset all operations', () => {
      monitor.record('op1', 10);
      monitor.record('op2', 20);

      monitor.reset();

      expect(monitor.getAllStats()).toHaveLength(0);
    });
  });

  describe('Enable/Disable', () => {
    it('should skip measurement when disabled', () => {
      monitor.setEnabled(false);

      const result = monitor.measure('test', () => 42);

      expect(result).toBe(42);
      expect(monitor.getStats('test')).toBeNull();
    });

    it('should resume measurement when enabled', () => {
      monitor.setEnabled(false);
      monitor.measure('test', () => 1);

      monitor.setEnabled(true);
      monitor.measure('test', () => 2);

      expect(monitor.getStats('test')!.count).toBe(1);
    });
  });

  describe('Percentiles', () => {
    beforeEach(() => {
      // Record 100 values from 1 to 100
      for (let i = 1; i <= 100; i++) {
        monitor.record('test', i);
      }
    });

    it('should calculate 50th percentile (median)', () => {
      const p50 = monitor.getPercentile('test', 50);
      expect(p50).toBeCloseTo(50, 0);
    });

    it('should calculate 95th percentile', () => {
      const p95 = monitor.getPercentile('test', 95);
      expect(p95).toBeCloseTo(95, 0);
    });

    it('should return null for non-existent operation', () => {
      const result = monitor.getPercentile('non-existent', 50);
      expect(result).toBeNull();
    });
  });

  describe('Threshold Checking', () => {
    it('should detect operations exceeding threshold', () => {
      monitor.record('fast', 5);
      monitor.record('slow', 50);

      expect(monitor.exceedsThreshold('fast', 10)).toBe(false);
      expect(monitor.exceedsThreshold('slow', 10)).toBe(true);
    });
  });
});
