"use strict";
/**
 * Performance Monitor
 *
 * Monitors and tracks performance metrics for schema operations.
 * Useful for identifying bottlenecks and optimizing validation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceMonitor = void 0;
exports.getPerformanceMonitor = getPerformanceMonitor;
exports.createPerformanceMonitor = createPerformanceMonitor;
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.enabled = true;
    }
    /**
     * Measure the execution time of a function
     */
    measure(operation, fn) {
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
    async measureAsync(operation, fn) {
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
    measureWithResult(operation, fn) {
        const start = this.now();
        const result = fn();
        const duration = this.now() - start;
        this.record(operation, duration);
        return { result, duration };
    }
    /**
     * Start a manual measurement
     */
    start(operation) {
        const start = this.now();
        return () => {
            const duration = this.now() - start;
            this.record(operation, duration);
        };
    }
    /**
     * Record a duration manually
     */
    record(operation, duration) {
        if (!this.metrics.has(operation)) {
            this.metrics.set(operation, []);
        }
        this.metrics.get(operation).push(duration);
    }
    /**
     * Get statistics for a specific operation
     */
    getStats(operation) {
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
    getAllStats() {
        const stats = [];
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
    getReport() {
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
    logReport() {
        console.log(this.getReport());
    }
    /**
     * Reset all metrics
     */
    reset(operation) {
        if (operation) {
            this.metrics.delete(operation);
        }
        else {
            this.metrics.clear();
        }
    }
    /**
     * Enable or disable monitoring
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    /**
     * Check if monitoring is enabled
     */
    isEnabled() {
        return this.enabled;
    }
    /**
     * Get current high-resolution time
     */
    now() {
        if (typeof performance !== 'undefined' && performance.now) {
            return performance.now();
        }
        return Date.now();
    }
    /**
     * Get percentile from durations
     */
    getPercentile(operation, percentile) {
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
    exceedsThreshold(operation, threshold) {
        const stats = this.getStats(operation);
        return stats ? stats.avgDuration > threshold : false;
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
// Singleton instance
let instance = null;
/**
 * Get the singleton instance of PerformanceMonitor
 */
function getPerformanceMonitor() {
    if (!instance) {
        instance = new PerformanceMonitor();
    }
    return instance;
}
/**
 * Create a new PerformanceMonitor instance (for testing or isolated usage)
 */
function createPerformanceMonitor() {
    return new PerformanceMonitor();
}
