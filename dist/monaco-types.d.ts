/**
 * FormFiller Schema - Monaco Editor Type Definitions Bundle
 * 
 * Auto-generated type definitions for Monaco Editor IntelliSense
 * Generated: 2026-01-05T16:38:02.894Z
 */

declare module 'formfiller-schema' {

declare type ConditionalExpression = {
    [field: string]: any;
} | {
    and: ConditionalExpression[];
} | {
    or: ConditionalExpression[];
} | {
    not: ConditionalExpression;
};
/**
 * Unified type for validation condition (same as ConditionalExpression)
 * Used in ValidationRule.when property
 */
declare type ValidationCondition = ConditionalExpression;
/**
 * All supported crossField validation types.
 * The type name IS the callback name - no conversion needed.
 */
declare const CROSS_FIELD_TYPES: readonly ["equals", "notEquals", "greaterThan", "lessThan", "sumEquals", "percentageSum", "dateInRange", "atLeastOne"];
declare type CrossFieldType = (typeof CROSS_FIELD_TYPES)[number];
declare interface ValidationRule {
    type: 'required' | 'stringLength' | 'arrayLength' | 'range' | 'pattern' | 'email' | 'numeric' | 'compare' | 'custom' | 'async' | 'computed' | 'temporal' | 'plugin' | 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'sumEquals' | 'percentageSum' | 'dateInRange' | 'atLeastOne';
    message?: string;
    /**
     * Determines where validation errors should be displayed
     * - 'currentField': only at the current field (default for field-level rules)
     * - 'allTargetFields': at all involved fields (default for form-level rules)
     * - string[]: specific field paths where the error should appear
     *
     * If not specified:
     * - field-level rule → 'currentField'
     * - form-level rule → 'allTargetFields'
     */
    errorTarget?: 'currentField' | 'allTargetFields' | string[];
    /**
     * Conditional expression that determines when this validation rule should be applied.
     * Supports the same 3 specification modes as visibleIf:
     * 1. Simple equality: { field: value }
     * 2. Implicit "in": { field: [value1, value2] }
     * 3. Explicit operator: { field: ['operator', value] }
     * Plus logical operators: and, or, not
     */
    when?: ValidationCondition;
    min?: number;
    max?: number;
    pattern?: string | RegExp;
    comparisonTarget?: string;
    comparisonType?: '==' | '!=' | '<' | '>' | '<=' | '>=';
    validationCallback?: string | ((value: any, context: any) => boolean | Promise<boolean>);
    apiEndpoint?: string;
    apiMethod?: 'GET' | 'POST';
    apiPayload?: Record<string, any>;
    apiTimeout?: number;
    targetFields?: string[];
    compute?: string | ((values: Record<string, any>, context: any) => any);
    returnToFrontend?: boolean;
    storeResult?: boolean;
    subtype?: 'exactMatch' | 'arrayMatch' | 'numericMatch' | 'keywordMatch' | 'custom';
    correctAnswer?: any;
    points?: number;
    penalty?: number;
    partialCredit?: boolean;
    tolerance?: number;
    keywords?: {
        required?: string[];
        optional?: string[];
    };
    minLength?: number;
    customEvaluator?: string;
    validFrom?: Date | string;
    validUntil?: Date | string;
    schedule?: string;
    timezone?: string;
    gracePeriod?: number;
    pluginName?: string;
    pluginConfig?: Record<string, any>;
    value?: number;
    validator?: string;
}
/**
 * Validation rule group with logical operators
 * Allows complex validation logic: (A AND B) OR (C AND D)
 *
 * Supports two formats:
 * 1. Legacy format: { operator: 'or', rules: [...] }
 * 2. New format: { or: [...], groupMessage: '...' }
 */
declare interface ValidationRuleGroup {
    operator?: 'and' | 'or' | 'not';
    rules?: Array<ValidationRule | ValidationRuleGroup>;
    message?: string;
    and?: Array<ValidationRule | ValidationRuleGroup>;
    or?: Array<ValidationRule | ValidationRuleGroup>;
    not?: ValidationRule | ValidationRuleGroup;
    groupMessage?: string;
    stopOnFirstError?: boolean;
}
/**
 * Combined type for validation rules
 */
declare type ValidationRuleOrGroup = ValidationRule | ValidationRuleGroup;
/**
 * @deprecated Use ConditionalExpression with object notation instead.
 * Legacy explicit format: { field: string, operator: string, value: any }
 * New unified format: { field: ['operator', value] }
 */
declare interface ConditionalField {
    field: string;
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'notIn' | 'contains' | 'startswith' | 'endswith';
    value: any;
    logicalOperator?: 'and' | 'or';
}
declare interface LookupConfig {
    dataSource: any[];
    displayExpr?: string;
    valueExpr?: string;
    setCellValue?: boolean;
    dependsOn?: string[];
}
declare interface BaseFieldConfig {
    name?: string;
    dataField?: string;
    label?: string | {
        text?: string;
        visible?: boolean;
        showColon?: boolean;
        location?: 'left' | 'right' | 'top';
        alignment?: 'left' | 'right' | 'center';
        [key: string]: any;
    };
    visible?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    colSpan?: number;
    value?: any;
    options?: Array<string | {
        value: any;
        text?: string;
        [key: string]: any;
    }>;
    valueExpr?: string;
    displayExpr?: string;
    width?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
    placeholder?: string;
    showClearButton?: boolean;
    validationRules?: ValidationRuleOrGroup[];
    visibleIf?: ConditionalExpression;
    disabledIf?: ConditionalExpression;
    readonlyIf?: ConditionalExpression;
    requiredIf?: ConditionalExpression;
    validationMessageMode?: 'always' | 'auto';
    validationMessagePosition?: 'bottom' | 'top' | 'left' | 'right';
    dependentFields?: string[];
    references?: string[];
    cssClass?: string;
    helpText?: string;
    stylingMode?: 'outlined' | 'underlined' | 'filled';
    tabIndex?: number;
    hint?: string;
    accessKey?: string;
    inputAttr?: Record<string, any>;
    lookup?: LookupConfig;
    editMode?: 'form' | 'cell' | 'row' | 'batch' | 'popup';
    allowEditing?: boolean;
    allowSorting?: boolean;
    allowFiltering?: boolean;
    editorOptions?: Record<string, any>;
}
declare type FieldType = 'autocomplete' | 'calendar' | 'checkbox' | 'colorbox' | 'date' | 'daterange' | 'dropdown' | 'dropdownbox' | 'htmleditor' | 'lookup' | 'number' | 'radiogroup' | 'rangeslider' | 'selectbox' | 'slider' | 'switch' | 'tagbox' | 'text' | 'textarea' | 'boolean' | 'time' | 'datetime' | 'grid' | 'tree' | 'form' | 'group' | 'tabbed' | 'tab' | 'stepper' | 'step' | 'button' | 'empty' | 'info';
declare interface NumberFormat {
    type?: 'currency' | 'percent' | 'decimal' | 'fixedPoint' | 'exponential' | 'thousands' | 'millions' | 'billions' | 'trillions' | 'largeNumber';
    precision?: number;
    currency?: string;
}
declare interface TextFieldConfig extends BaseFieldConfig {
    type: 'text';
    mode?: 'text' | 'password' | 'email' | 'tel' | 'url';
    maxLength?: number;
    mask?: string;
    maskRules?: Record<string, RegExp>;
    maskChar?: string;
    maskInvalidMessage?: string;
    useMaskedValue?: boolean;
}
declare interface NumberFieldConfig extends BaseFieldConfig {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
    showSpinButtons?: boolean;
    format?: string | NumberFormat;
}
declare interface DateFieldConfig extends BaseFieldConfig {
    type: 'date';
    min?: string | Date;
    max?: string | Date;
    displayFormat?: string;
    format?: string;
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
    useMaskBehavior?: boolean;
    openOnFieldClick?: boolean;
    dateSerializationFormat?: string;
    calendarOptions?: Record<string, any>;
}
declare interface DateTimeFieldConfig extends BaseFieldConfig {
    type: 'datetime';
    min?: string | Date;
    max?: string | Date;
    displayFormat?: string;
    format?: string;
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
    useMaskBehavior?: boolean;
    openOnFieldClick?: boolean;
    dateSerializationFormat?: string;
    calendarOptions?: Record<string, any>;
}
declare interface TimeFieldConfig extends BaseFieldConfig {
    type: 'time';
    min?: string;
    max?: string;
    displayFormat?: string;
    format?: string;
    interval?: number;
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
}
declare interface DateRangeFieldConfig extends BaseFieldConfig {
    type: 'daterange';
    min?: string | Date;
    max?: string | Date;
    startDateExpr?: string;
    endDateExpr?: string;
}
declare interface BooleanFieldConfig extends BaseFieldConfig {
    type: 'boolean' | 'checkbox';
    text?: string;
}
declare interface SwitchFieldConfig extends BaseFieldConfig {
    type: 'switch';
    switchedOnText?: string;
    switchedOffText?: string;
}
declare interface DropdownFieldConfig extends BaseFieldConfig {
    type: 'dropdown' | 'selectbox';
    lookup?: LookupConfig;
    searchEnabled?: boolean;
    acceptCustomValue?: boolean;
    showDropDownButton?: boolean;
    grouped?: boolean;
    noDataText?: string;
    wrapItemText?: boolean;
    dropDownOptions?: Record<string, any>;
}
declare interface TagBoxFieldConfig extends BaseFieldConfig {
    type: 'tagbox';
    lookup?: LookupConfig;
    searchEnabled?: boolean;
    acceptCustomValue?: boolean;
    showDropDownButton?: boolean;
    showSelectionControls?: boolean;
    applyValueMode?: 'instantly' | 'useButtons';
    maxDisplayedTags?: number;
    selectAllMode?: 'allPages' | 'page';
    hideSelectedItems?: boolean;
    maxFilterQueryLength?: number;
    selectAllText?: string;
}
declare interface RadioGroupFieldConfig extends BaseFieldConfig {
    type: 'radiogroup';
    lookup?: LookupConfig;
    layout?: 'horizontal' | 'vertical';
}
declare interface SliderFieldConfig extends BaseFieldConfig {
    type: 'slider';
    min?: number;
    max?: number;
    step?: number;
    showRange?: boolean;
    tooltip?: {
        enabled?: boolean;
        format?: string;
        showMode?: 'always' | 'onHover';
    };
}
declare interface RangeSliderFieldConfig extends BaseFieldConfig {
    type: 'rangeslider';
    min?: number;
    max?: number;
    step?: number;
    start?: number;
    end?: number;
}
declare interface TextAreaFieldConfig extends BaseFieldConfig {
    type: 'textarea';
    maxLength?: number;
    autoResizeEnabled?: boolean;
}
/**
 * HtmlEditor toolbar item configuration
 * Can be either a string (predefined item name) or an object with custom configuration
 */
declare interface HtmlEditorToolbarItem {
    /** Predefined item name: bold, italic, strike, underline, alignLeft, alignCenter, alignRight,
     * alignJustify, orderedList, bulletList, header, blockquote, codeBlock, color, background,
     * link, image, variable, insertTable, deleteTable, insertRowAbove, insertRowBelow, deleteRow,
     * insertColumnLeft, insertColumnRight, deleteColumn, undo, redo, clear, separator */
    name?: string;
    /** Accepted values for the item (e.g., [1, 2, 3, false] for header levels) */
    acceptedValues?: (string | number | boolean)[];
    /** Widget-specific configuration options */
    options?: Record<string, any>;
    /** When to display text for the toolbar item */
    showText?: 'always' | 'inMenu';
    /** Text displayed for the toolbar item */
    text?: string;
    /** Whether the toolbar item is visible */
    visible?: boolean;
    /** Widget type to represent the item (e.g., 'dxButton', 'dxSelectBox') */
    widget?: string;
    /** Location of the item in the toolbar */
    location?: 'before' | 'after' | 'center';
    /** Custom format name */
    formatName?: string;
    /** Custom format values */
    formatValues?: any[];
}
/**
 * HtmlEditor toolbar configuration
 */
declare interface HtmlEditorToolbarConfig {
    /** Toolbar items - can be predefined item names (strings) or custom item configurations */
    items?: (string | HtmlEditorToolbarItem)[];
    /** Whether the toolbar can span multiple lines */
    multiline?: boolean;
}
/**
 * HtmlEditor media resizing configuration
 */
declare interface HtmlEditorMediaResizingConfig {
    /** Whether media resizing is enabled */
    enabled?: boolean;
}
declare interface HtmlEditorFieldConfig extends BaseFieldConfig {
    type: 'htmleditor';
    /** Toolbar configuration */
    toolbar?: HtmlEditorToolbarConfig;
    /** Media resizing configuration */
    mediaResizing?: HtmlEditorMediaResizingConfig;
    /** Output value format type */
    valueType?: 'html' | 'markdown';
}
declare interface ColorBoxFieldConfig extends BaseFieldConfig {
    type: 'colorbox';
    applyValueMode?: 'instantly' | 'useButtons';
    editAlphaChannel?: boolean;
}
declare interface AutocompleteFieldConfig extends BaseFieldConfig {
    type: 'autocomplete';
    lookup?: LookupConfig;
    minSearchLength?: number;
    searchTimeout?: number;
}
declare interface LookupFieldConfig extends BaseFieldConfig {
    type: 'lookup';
    lookup: LookupConfig;
    searchEnabled?: boolean;
    minSearchLength?: number;
    searchTimeout?: number;
}
declare interface CalendarFieldConfig extends BaseFieldConfig {
    type: 'calendar';
    min?: string | Date;
    max?: string | Date;
    firstDayOfWeek?: number;
    zoomLevel?: 'month' | 'year' | 'decade' | 'century';
}
declare interface FormPreferences {
    addSaveBtn?: boolean;
    saveLimit?: number | null;
    saveUrl?: string;
    computedRuleResults?: 'none' | 'score' | 'detailed';
    storeComputedResults?: boolean;
    /**
     * Show validation errors in a summary accordion at the top of the form
     * @default true
     */
    showErrorsOnFormLevel?: boolean;
}
declare interface ItemConfig {
    id?: string;
    _id?: string;
    title?: string;
    label?: string;
    description?: string;
    type?: 'grid' | 'tree' | 'form';
    configId?: string;
    slug?: string;
    name?: string;
    items: FieldConfig[];
    addSaveBtn?: boolean;
    validationRules?: ValidationRuleOrGroup[];
    computedRules?: ComputedRule[];
    dataTransformation?: (data: any) => any;
    toolbar?: {
        items: Array<{
            location: 'before' | 'after';
            widget: 'dxButton' | 'dxSelectBox';
            options: any;
        }>;
    };
    dataSource?: any;
    editing?: {
        allowAdding?: boolean;
        allowUpdating?: boolean;
        allowDeleting?: boolean;
        allowRefreshing?: boolean;
        confirmDelete?: boolean;
        useIcons?: boolean;
        mode?: 'batch' | 'cell' | 'row' | 'form' | 'popup';
    };
    export?: {
        enabled?: boolean;
        fileName?: string;
        formats?: ('xlsx' | 'pdf')[];
    };
    height?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    dataPath?: string;
    onRowClick?: string;
    onCellClick?: string;
    onRowDblClick?: string;
    keyExpr?: string;
    parentIdExpr?: string;
    autoExpandAll?: boolean;
    showRowLines?: boolean;
    showBorders?: boolean;
    columnAutoWidth?: boolean;
    allowColumnReordering?: boolean;
    allowColumnResizing?: boolean;
    showColumnHeaders?: boolean;
}
declare interface FormConfig {
    _id?: string;
    title: string;
    description?: string;
    slug?: string;
    preferences?: FormPreferences;
    itemConfig: ItemConfig;
    isActive?: boolean;
    createdBy?: string;
    tags?: string[];
    version?: string;
    isPublic?: boolean;
    allowedUsers?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
/** @deprecated Use ItemConfig instead */
declare type ViewConfig = ItemConfig;
declare interface GridFieldConfig extends BaseFieldConfig {
    type: 'grid';
    config: ItemConfig;
}
declare interface TreeFieldConfig extends BaseFieldConfig {
    type: 'tree';
    config: ItemConfig;
}
declare interface FormFieldConfig extends BaseContainerConfig {
    type: 'form';
    config?: ItemConfig | FieldConfig[];
}
declare interface BaseContainerConfig extends BaseFieldConfig {
    items?: FieldConfig[];
    excludeFromPath?: boolean;
}
declare interface GroupFieldConfig extends BaseContainerConfig {
    type: 'group';
    name?: string;
    caption?: string;
    captionRender?: string;
    colCount?: number | 'auto';
}
declare interface TabbedFieldConfig extends BaseContainerConfig {
    type: 'tabbed';
    name?: string;
    tabPanelOptions?: any;
}
declare interface TabFieldConfig extends BaseContainerConfig {
    type: 'tab';
    name?: string;
    tabTitle?: string;
    tabIcon?: string;
    tabColCount?: number;
}
declare interface StepperFieldConfig extends BaseContainerConfig {
    type: 'stepper';
    name?: string;
    stepperOptions?: {
        showNavButtons?: boolean;
        showTitle?: boolean;
        orientation?: 'horizontal' | 'vertical';
    };
}
declare interface StepFieldConfig extends BaseContainerConfig {
    type: 'step';
    name?: string;
    stepTitle?: string;
    stepIcon?: string;
}
declare interface ButtonFieldConfig extends Omit<BaseFieldConfig, 'stylingMode'> {
    type: 'button';
    text?: string;
    title?: string;
    icon?: string;
    buttonType?: 'normal' | 'success' | 'default' | 'danger' | 'back';
    stylingMode?: 'text' | 'outlined' | 'contained';
    action?: ((...args: any[]) => void) | string;
    horizontalAlignment?: 'left' | 'center' | 'right';
    verticalAlignment?: 'top' | 'center' | 'bottom';
    buttonOptions?: {
        text?: string;
        icon?: string;
        type?: 'normal' | 'success' | 'default' | 'danger' | 'back';
        stylingMode?: 'text' | 'outlined' | 'contained';
        width?: number | string;
        height?: number | string;
        disabled?: boolean;
        onClick?: string | {
            handler: string;
            params?: Record<string, any>;
        };
    };
}
declare interface EmptyFieldConfig extends BaseFieldConfig {
    type: 'empty';
}
declare interface InfoFieldConfig extends BaseFieldConfig {
    type: 'info';
    text?: string;
    html?: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
    icon?: boolean | string;
    dismissible?: boolean;
}
declare interface ComputedRule {
    id: string;
    name: string;
    type: 'field' | 'aggregate';
    fieldName?: string;
    subtype?: 'exactMatch' | 'arrayMatch' | 'numericMatch' | 'keywordMatch' | 'custom';
    correctAnswer?: any;
    keywords?: {
        required?: string[];
        optional?: string[];
    };
    points?: number;
    penalty?: number;
    partialCredit?: boolean;
    tolerance?: number;
    minLength?: number;
    message?: string;
    inputFields?: string[];
    categoryMapping?: Record<string, string>;
    evaluationRules?: Array<{
        condition: ConditionalExpression;
        result: string;
        message: string;
    }>;
    returnToFrontend?: boolean;
    storeResult?: boolean;
}
declare type FieldConfig = TextFieldConfig | NumberFieldConfig | DateFieldConfig | DateTimeFieldConfig | TimeFieldConfig | DateRangeFieldConfig | BooleanFieldConfig | SwitchFieldConfig | DropdownFieldConfig | TagBoxFieldConfig | RadioGroupFieldConfig | SliderFieldConfig | RangeSliderFieldConfig | TextAreaFieldConfig | HtmlEditorFieldConfig | ColorBoxFieldConfig | AutocompleteFieldConfig | LookupFieldConfig | CalendarFieldConfig | GridFieldConfig | TreeFieldConfig | FormFieldConfig | GroupFieldConfig | TabbedFieldConfig | TabFieldConfig | StepperFieldConfig | StepFieldConfig | ButtonFieldConfig | EmptyFieldConfig | InfoFieldConfig;
//# sourceMappingURL=index.d.ts.map

/**
 * Deprecation Manager
 *
 * Manages deprecated fields and provides warnings for their usage.
 * Helps with smooth transitions between schema versions.
 */
declare interface DeprecatedField {
    fieldName: string;
    deprecatedIn: string;
    removedIn?: string;
    replacement?: string;
    migrationHelper?: (oldValue: any) => any;
    message?: string;
}
declare interface DeprecationWarning {
    field: string;
    message: string;
    replacement?: string;
    suggestion?: string;
}
declare class DeprecationManager {
    private deprecations;
    private warningShown;
    private enableLogging;
    /**
     * Mark a field as deprecated
     */
    markAsDeprecated(field: DeprecatedField): void;
    /**
     * Mark multiple fields as deprecated
     */
    markMultipleAsDeprecated(fields: DeprecatedField[]): void;
    /**
     * Check configuration for deprecated fields
     */
    checkDeprecations(config: any, path?: string): DeprecationWarning[];
    /**
     * Migrate deprecated fields to new structure
     */
    migrateDeprecated(config: any): {
        migrated: any;
        warnings: DeprecationWarning[];
    };
    /**
     * Apply migration helpers to deprecated fields
     */
    private applyMigrations;
    /**
     * Check if a field is deprecated
     */
    isDeprecated(fieldName: string): boolean;
    /**
     * Get deprecation info for a field
     */
    getDeprecationInfo(fieldName: string): DeprecatedField | undefined;
    /**
     * Get all deprecations
     */
    getAllDeprecations(): Map<string, DeprecatedField>;
    /**
     * Enable or disable console logging
     */
    setLogging(enabled: boolean): void;
    /**
     * Reset warning shown tracking
     */
    resetWarnings(): void;
    /**
     * Build deprecation message
     */
    private buildDeprecationMessage;
    /**
     * Log warning to console
     */
    private logWarning;
    /**
     * Set nested value in object using dot notation
     */
    private setNestedValue;
}
/**
 * Get the singleton instance of DeprecationManager
 */
declare function getDeprecationManager(): DeprecationManager;
//# sourceMappingURL=DeprecationManager.d.ts.map

/**
 * Performance Monitor
 *
 * Monitors and tracks performance metrics for schema operations.
 * Useful for identifying bottlenecks and optimizing validation.
 */
declare interface PerformanceMetrics {
    operation: string;
    count: number;
    totalDuration: number;
    avgDuration: number;
    minDuration: number;
    maxDuration: number;
    lastDuration: number;
}
declare interface MeasurementResult<T> {
    result: T;
    duration: number;
}
declare class PerformanceMonitor {
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
declare function getPerformanceMonitor(): PerformanceMonitor;
/**
 * Create a new PerformanceMonitor instance (for testing or isolated usage)
 */
declare function createPerformanceMonitor(): PerformanceMonitor;
//# sourceMappingURL=PerformanceMonitor.d.ts.map

/**
 * Schema Cache
 *
 * Provides caching mechanism for compiled schema validators.
 * Improves performance by avoiding repeated schema compilation.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */

declare const Ajv2019: any;
declare type Ajv2019Type = InstanceType<typeof Ajv2019>;
declare interface CacheStats {
    hits: number;
    misses: number;
    size: number;
}
declare class SchemaCache {
    private cache;
    private ajv;
    private stats;
    constructor(ajvOptions?: any);
    /**
     * Get a validator from cache or compile if not exists
     */
    getValidator(schemaId: string, schema: any): ValidateFunction;
    /**
     * Get or create a validator with automatic schema ID generation
     */
    getOrCreateValidator(schema: any): ValidateFunction;
    /**
     * Check if a validator exists in cache
     */
    has(schemaId: string): boolean;
    /**
     * Invalidate a specific cache entry
     */
    invalidate(schemaId: string): boolean;
    /**
     * Invalidate all cache entries
     */
    invalidateAll(): void;
    /**
     * Get cache statistics
     */
    getStats(): Readonly<CacheStats>;
    /**
     * Reset statistics
     */
    resetStats(): void;
    /**
     * Get cache hit rate
     */
    getHitRate(): number;
    /**
     * Generate a unique ID for a schema
     */
    private generateSchemaId;
    /**
     * Get the underlying AJV instance
     */
    getAjv(): Ajv2019Type;
    /**
     * Add a schema to AJV instance
     */
    addSchema(schema: any, schemaId?: string): void;
    /**
     * Remove a schema from AJV instance
     */
    removeSchema(schemaIdOrRef: string): void;
}
/**
 * Get the singleton instance of SchemaCache
 */
declare function getSchemaCache(): SchemaCache;
/**
 * Create a new SchemaCache instance (for testing or isolated usage)
 */
declare function createSchemaCache(ajvOptions?: any): SchemaCache;
{};
//# sourceMappingURL=SchemaCache.d.ts.map

/**
 * Schema Defaults
 *
 * Centralized repository for default values used across the schema.
 * Provides type-safe default application for configurations.
 */

declare class SchemaDefaults {
    /**
     * Default values for FormPreferences
     */
    static readonly FormPreferences: {
        readonly addSaveBtn: false;
        readonly saveLimit: null;
        readonly saveUrl: undefined;
    };
    /**
     * Default values for ItemConfig editing settings
     */
    static readonly ItemConfigEditing: {
        allowAdding: boolean;
        allowUpdating: boolean;
        allowDeleting: boolean;
        mode: "row";
    };
    /**
     * Default values for ItemConfig
     */
    static readonly ItemConfig: Partial<ItemConfig>;
    /**
     * Default values for GroupFieldConfig
     */
    static readonly GroupFieldConfig: {
        readonly colCount: 1;
        readonly excludeFromPath: false;
    };
    /**
     * Default values for Tree/Grid ItemConfig (DevExtreme-specific display options)
     */
    static readonly TreeItemConfig: {
        readonly autoExpandAll: false;
        readonly showRowLines: true;
        readonly showBorders: true;
        readonly columnAutoWidth: false;
        readonly allowColumnReordering: false;
        readonly allowColumnResizing: true;
        readonly showColumnHeaders: true;
    };
    /**
     * Apply defaults to a partial object
     * @param obj Partial object to fill with defaults
     * @param defaults Complete default object
     * @returns Object with defaults applied
     */
    static applyDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
    /**
     * Deep merge defaults with object
     * @param obj Partial object to fill with defaults
     * @param defaults Complete default object
     * @returns Deep merged object
     */
    static deepApplyDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
    /**
     * Get default FormPreferences
     */
    static getFormPreferences(): {
        addSaveBtn: false;
        saveLimit: null;
        saveUrl: undefined;
    };
    /**
     * Create a new FormPreferences with custom overrides
     */
    static createFormPreferences(overrides?: Partial<FormPreferences>): FormPreferences;
}
/**
 * Helper function for quick default application
 */
declare function withDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
/**
 * Helper function for deep default application
 */
declare function withDeepDefaults<T extends object>(obj: Partial<T>, defaults: T): T;
//# sourceMappingURL=SchemaDefaults.d.ts.map

/**
 * Schema Validator
 *
 * Provides multi-level validation for schema configurations.
 * Supports STRICT, LOOSE, and DEVELOPMENT validation modes.
 *
 * Uses AJV 2019-09 for JSON Schema 2019-09 support (unevaluatedProperties).
 */
declare enum ValidationLevel {
    STRICT = "strict",
    LOOSE = "loose",
    DEVELOPMENT = "development"
}
declare interface ValidationRule {
    field: string;
    validator: (value: any) => boolean;
    message: string;
}
declare interface ValidationOptions {
    level: ValidationLevel;
    allowDeprecated?: boolean;
    customRules?: ValidationRule[];
    abortEarly?: boolean;
}
declare interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings?: ValidationWarning[];
}
declare interface ValidationError {
    field: string;
    message: string;
    value?: any;
}
declare interface ValidationWarning {
    field: string;
    message: string;
    suggestion?: string;
}
declare class SchemaValidator {
    private ajv;
    private compiledValidators;
    constructor();
    /**
     * Validate a configuration with specified options
     */
    validate(config: any, schema: any, options?: ValidationOptions): ValidationResult;
    /**
     * Strict validation - all fields required, full type checking
     */
    private strictValidation;
    /**
     * Loose validation - optional fields allowed, basic type checking
     */
    private looseValidation;
    /**
     * Development validation - minimal checks, maximum flexibility
     */
    private devValidation;
    /**
     * Get or compile a validator for a schema
     */
    private getValidator;
    /**
     * Make schema loose by removing required fields
     */
    private makeSchemaLoose;
    /**
     * Check if an AJV error is critical
     */
    private isCriticalError;
    /**
     * Format AJV error to our format
     */
    private formatAjvError;
    /**
     * Apply custom validation rules
     */
    private applyCustomRules;
    /**
     * Check for deprecated fields (stub for integration with DeprecationManager)
     */
    private checkDeprecatedFields;
    /**
     * Get nested value from object using dot notation
     */
    private getNestedValue;
    /**
     * Clear compiled validator cache
     */
    clearCache(): void;
}
//# sourceMappingURL=SchemaValidator.d.ts.map

/**
 * Schema Version Manager
 *
 * Handles schema version migrations between different versions.
 * Supports automatic migration chains and version compatibility checks.
 */
declare interface SchemaMigration {
    fromVersion: string;
    toVersion: string;
    migrate: (oldConfig: any) => any;
    description?: string;
}
declare class SchemaVersionManager {
    private migrations;
    /**
     * Register a migration path
     */
    registerMigration(migration: SchemaMigration): void;
    /**
     * Register multiple migrations at once
     */
    registerMigrations(migrations: SchemaMigration[]): void;
    /**
     * Migrate a configuration to a target version
     */
    migrate(config: any, targetVersion: string): any;
    /**
     * Check if migration is available between versions
     */
    canMigrate(fromVersion: string, toVersion: string): boolean;
    /**
     * Get all registered migrations
     */
    getMigrations(): ReadonlyArray<SchemaMigration>;
    /**
     * Build a migration chain from source to target version
     */
    private buildMigrationChain;
    /**
     * Check if version is between two versions (inclusive)
     */
    isVersionBetween(version: string, minVersion: string, maxVersion: string): boolean;
    /**
     * Compare versions (simple semantic versioning)
     */
    private compareVersions;
    private isVersionGreaterThanOrEqual;
    private isVersionLessThanOrEqual;
}
/**
 * Get the singleton instance of SchemaVersionManager
 */
declare function getVersionManager(): SchemaVersionManager;
//# sourceMappingURL=SchemaVersionManager.d.ts.map

}
