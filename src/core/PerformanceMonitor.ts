/**
 * Performance Monitor
 *
 * Monitors and tracks performance metrics for schema operations.
 * Useful for identifying bottlenecks and optimizing validation.
 */

export interface PerformanceMetrics {
  operation: string;
  count: number;
  totalDuration: number;
  avgDuration: number;
  minDuration: number;
  maxDuration: number;
  lastDuration: number;
}

export interface MeasurementResult<T> {
  result: T;
  duration: number;
}

export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private enabled: boolean = true;

  /**
   * Measure the execution time of a function
   */
  measure<T>(operation: string, fn: () => T): T {
    if (!this.enabled) {
      return fn();
    }

    const start = this.now();
    const result = fn();
    const duration = this.now() - start;

    this.record(operation, duration);

    return result;
  }

  /**
   * Measure async function execution time
   */
  async measureAsync<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    if (!this.enabled) {
      return fn();
    }

    const start = this.now();
    const result = await fn();
    const duration = this.now() - start;

    this.record(operation, duration);

    return result;
  }

  /**
   * Measure and return both result and duration
   */
  measureWithResult<T>(operation: string, fn: () => T): MeasurementResult<T> {
    const start = this.now();
    const result = fn();
    const duration = this.now() - start;

    this.record(operation, duration);

    return { result, duration };
  }

  /**
   * Start a manual measurement
   */
  start(operation: string): () => void {
    const start = this.now();

    return () => {
      const duration = this.now() - start;
      this.record(operation, duration);
    };
  }

  /**
   * Record a duration manually
   */
  record(operation: string, duration: number): void {
    if (!this.metrics.has(operation)) {
      this.metrics.set(operation, []);
    }

    this.metrics.get(operation)!.push(duration);
  }

  /**
   * Get statistics for a specific operation
   */
  getStats(operation: string): PerformanceMetrics | null {
    const durations = this.metrics.get(operation);

    if (!durations || durations.length === 0) {
      return null;
    }

    const count = durations.length;
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);
    const avgDuration = totalDuration / count;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    const lastDuration = durations[durations.length - 1];

    return {
      operation,
      count,
      totalDuration,
      avgDuration,
      minDuration,
      maxDuration,
      lastDuration,
    };
  }

  /**
   * Get all statistics
   */
  getAllStats(): PerformanceMetrics[] {
    const stats: PerformanceMetrics[] = [];

    for (const operation of this.metrics.keys()) {
      const stat = this.getStats(operation);
      if (stat) {
        stats.push(stat);
      }
    }

    return stats.sort((a, b) => b.avgDuration - a.avgDuration);
  }

  /**
   * Get a summary report
   */
  getReport(): string {
    const stats = this.getAllStats();

    if (stats.length === 0) {
      return 'No performance data collected';
    }

    let report = '\n=== Performance Report ===\n\n';

    for (const stat of stats) {
      report += `${stat.operation}:\n`;
      report += `  Count: ${stat.count}\n`;
      report += `  Avg: ${stat.avgDuration.toFixed(2)}ms\n`;
      report += `  Min: ${stat.minDuration.toFixed(2)}ms\n`;
      report += `  Max: ${stat.maxDuration.toFixed(2)}ms\n`;
      report += `  Total: ${stat.totalDuration.toFixed(2)}ms\n\n`;
    }

    return report;
  }

  /**
   * Log report to console
   */
  logReport(): void {
    console.log(this.getReport());
  }

  /**
   * Reset all metrics
   */
  reset(operation?: string): void {
    if (operation) {
      this.metrics.delete(operation);
    } else {
      this.metrics.clear();
    }
  }

  /**
   * Enable or disable monitoring
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Check if monitoring is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Get current high-resolution time
   */
  private now(): number {
    if (typeof performance !== 'undefined' && performance.now) {
      return performance.now();
    }
    return Date.now();
  }

  /**
   * Get percentile from durations
   */
  getPercentile(operation: string, percentile: number): number | null {
    const durations = this.metrics.get(operation);

    if (!durations || durations.length === 0) {
      return null;
    }

    const sorted = [...durations].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;

    return sorted[Math.max(0, index)];
  }

  /**
   * Check if operation exceeds threshold
   */
  exceedsThreshold(operation: string, threshold: number): boolean {
    const stats = this.getStats(operation);
    return stats ? stats.avgDuration > threshold : false;
  }
}

// Singleton instance
let instance: PerformanceMonitor | null = null;

/**
 * Get the singleton instance of PerformanceMonitor
 */
export function getPerformanceMonitor(): PerformanceMonitor {
  if (!instance) {
    instance = new PerformanceMonitor();
  }
  return instance;
}

/**
 * Create a new PerformanceMonitor instance (for testing or isolated usage)
 */
export function createPerformanceMonitor(): PerformanceMonitor {
  return new PerformanceMonitor();
}
