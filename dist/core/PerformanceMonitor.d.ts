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
export declare class PerformanceMonitor {
    private metrics;
    private enabled;
    /**
     * Measure the execution time of a function
     */
    measure<T>(operation: string, fn: () => T): T;
    /**
     * Measure async function execution time
     */
    measureAsync<T>(operation: string, fn: () => Promise<T>): Promise<T>;
    /**
     * Measure and return both result and duration
     */
    measureWithResult<T>(operation: string, fn: () => T): MeasurementResult<T>;
    /**
     * Start a manual measurement
     */
    start(operation: string): () => void;
    /**
     * Record a duration manually
     */
    record(operation: string, duration: number): void;
    /**
     * Get statistics for a specific operation
     */
    getStats(operation: string): PerformanceMetrics | null;
    /**
     * Get all statistics
     */
    getAllStats(): PerformanceMetrics[];
    /**
     * Get a summary report
     */
    getReport(): string;
    /**
     * Log report to console
     */
    logReport(): void;
    /**
     * Reset all metrics
     */
    reset(operation?: string): void;
    /**
     * Enable or disable monitoring
     */
    setEnabled(enabled: boolean): void;
    /**
     * Check if monitoring is enabled
     */
    isEnabled(): boolean;
    /**
     * Get current high-resolution time
     */
    private now;
    /**
     * Get percentile from durations
     */
    getPercentile(operation: string, percentile: number): number | null;
    /**
     * Check if operation exceeds threshold
     */
    exceedsThreshold(operation: string, threshold: number): boolean;
}
/**
 * Get the singleton instance of PerformanceMonitor
 */
export declare function getPerformanceMonitor(): PerformanceMonitor;
/**
 * Create a new PerformanceMonitor instance (for testing or isolated usage)
 */
export declare function createPerformanceMonitor(): PerformanceMonitor;
