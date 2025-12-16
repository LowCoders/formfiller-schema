export type ConditionalExpression = {
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
export type ValidationCondition = ConditionalExpression;
export interface ValidationRule {
    type: 'required' | 'stringLength' | 'arrayLength' | 'range' | 'pattern' | 'email' | 'numeric' | 'compare' | 'custom' | 'async' | 'crossField' | 'computed' | 'temporal' | 'plugin' | 'arrayLength';
    message?: string;
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
    crossFieldValidator?: string | {
        name: string;
        params?: Record<string, any>;
    } | ((values: Record<string, any>, context: any) => boolean);
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
export interface ValidationRuleGroup {
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
export type ValidationRuleOrGroup = ValidationRule | ValidationRuleGroup;
/**
 * @deprecated Use ConditionalExpression with object notation instead.
 * Legacy explicit format: { field: string, operator: string, value: any }
 * New unified format: { field: ['operator', value] }
 */
export interface ConditionalField {
    field: string;
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'notIn' | 'contains' | 'startswith' | 'endswith';
    value: any;
    logicalOperator?: 'and' | 'or';
}
export interface LookupConfig {
    dataSource: any[];
    displayExpr?: string;
    valueExpr?: string;
    setCellValue?: boolean;
    dependsOn?: string[];
}
export interface BaseFieldConfig {
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
export type FieldType = 'autocomplete' | 'calendar' | 'checkbox' | 'colorbox' | 'date' | 'daterange' | 'dropdown' | 'dropdownbox' | 'htmleditor' | 'lookup' | 'number' | 'radiogroup' | 'rangeslider' | 'selectbox' | 'slider' | 'switch' | 'tagbox' | 'text' | 'textarea' | 'boolean' | 'time' | 'datetime' | 'grid' | 'tree' | 'form' | 'group' | 'tabbed' | 'tab' | 'stepper' | 'step' | 'button' | 'empty' | 'info';
export interface NumberFormat {
    type?: 'currency' | 'percent' | 'decimal' | 'fixedPoint' | 'exponential' | 'thousands' | 'millions' | 'billions' | 'trillions' | 'largeNumber';
    precision?: number;
    currency?: string;
}
export interface TextFieldConfig extends BaseFieldConfig {
    type: 'text';
    mode?: 'text' | 'password' | 'email' | 'tel' | 'url';
    maxLength?: number;
    mask?: string;
    maskRules?: Record<string, RegExp>;
    maskChar?: string;
    maskInvalidMessage?: string;
    useMaskedValue?: boolean;
}
export interface NumberFieldConfig extends BaseFieldConfig {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
    showSpinButtons?: boolean;
    format?: string | NumberFormat;
}
export interface DateFieldConfig extends BaseFieldConfig {
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
export interface DateTimeFieldConfig extends BaseFieldConfig {
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
export interface TimeFieldConfig extends BaseFieldConfig {
    type: 'time';
    min?: string;
    max?: string;
    displayFormat?: string;
    format?: string;
    interval?: number;
    pickerType?: 'calendar' | 'list' | 'native' | 'rollers';
}
export interface DateRangeFieldConfig extends BaseFieldConfig {
    type: 'daterange';
    min?: string | Date;
    max?: string | Date;
    startDateExpr?: string;
    endDateExpr?: string;
}
export interface BooleanFieldConfig extends BaseFieldConfig {
    type: 'boolean' | 'checkbox';
    text?: string;
}
export interface SwitchFieldConfig extends BaseFieldConfig {
    type: 'switch';
    switchedOnText?: string;
    switchedOffText?: string;
}
export interface DropdownFieldConfig extends BaseFieldConfig {
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
export interface TagBoxFieldConfig extends BaseFieldConfig {
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
export interface RadioGroupFieldConfig extends BaseFieldConfig {
    type: 'radiogroup';
    lookup?: LookupConfig;
    layout?: 'horizontal' | 'vertical';
}
export interface SliderFieldConfig extends BaseFieldConfig {
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
export interface RangeSliderFieldConfig extends BaseFieldConfig {
    type: 'rangeslider';
    min?: number;
    max?: number;
    step?: number;
    start?: number;
    end?: number;
}
export interface TextAreaFieldConfig extends BaseFieldConfig {
    type: 'textarea';
    maxLength?: number;
    autoResizeEnabled?: boolean;
}
/**
 * HtmlEditor toolbar item configuration
 * Can be either a string (predefined item name) or an object with custom configuration
 */
export interface HtmlEditorToolbarItem {
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
export interface HtmlEditorToolbarConfig {
    /** Toolbar items - can be predefined item names (strings) or custom item configurations */
    items?: (string | HtmlEditorToolbarItem)[];
    /** Whether the toolbar can span multiple lines */
    multiline?: boolean;
}
/**
 * HtmlEditor media resizing configuration
 */
export interface HtmlEditorMediaResizingConfig {
    /** Whether media resizing is enabled */
    enabled?: boolean;
}
export interface HtmlEditorFieldConfig extends BaseFieldConfig {
    type: 'htmleditor';
    /** Toolbar configuration */
    toolbar?: HtmlEditorToolbarConfig;
    /** Media resizing configuration */
    mediaResizing?: HtmlEditorMediaResizingConfig;
    /** Output value format type */
    valueType?: 'html' | 'markdown';
}
export interface ColorBoxFieldConfig extends BaseFieldConfig {
    type: 'colorbox';
    applyValueMode?: 'instantly' | 'useButtons';
    editAlphaChannel?: boolean;
}
export interface AutocompleteFieldConfig extends BaseFieldConfig {
    type: 'autocomplete';
    lookup?: LookupConfig;
    minSearchLength?: number;
    searchTimeout?: number;
}
export interface LookupFieldConfig extends BaseFieldConfig {
    type: 'lookup';
    lookup: LookupConfig;
    searchEnabled?: boolean;
    minSearchLength?: number;
    searchTimeout?: number;
}
export interface CalendarFieldConfig extends BaseFieldConfig {
    type: 'calendar';
    min?: string | Date;
    max?: string | Date;
    firstDayOfWeek?: number;
    zoomLevel?: 'month' | 'year' | 'decade' | 'century';
}
export interface FormPreferences {
    addSaveBtn?: boolean;
    saveLimit?: number | null;
    saveUrl?: string;
    computedRuleResults?: 'none' | 'score' | 'detailed';
    storeComputedResults?: boolean;
}
export interface ItemConfig {
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
export interface FormConfig {
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
export type ViewConfig = ItemConfig;
export interface GridFieldConfig extends BaseFieldConfig {
    type: 'grid';
    config: ItemConfig;
}
export interface TreeFieldConfig extends BaseFieldConfig {
    type: 'tree';
    config: ItemConfig;
}
export interface FormFieldConfig extends BaseContainerConfig {
    type: 'form';
    config?: ItemConfig | FieldConfig[];
}
export interface BaseContainerConfig extends BaseFieldConfig {
    items?: FieldConfig[];
    excludeFromPath?: boolean;
}
export interface GroupFieldConfig extends BaseContainerConfig {
    type: 'group';
    name?: string;
    caption?: string;
    captionRender?: string;
    colCount?: number | 'auto';
}
export interface TabbedFieldConfig extends BaseContainerConfig {
    type: 'tabbed';
    name?: string;
    tabPanelOptions?: any;
}
export interface TabFieldConfig extends BaseContainerConfig {
    type: 'tab';
    name?: string;
    tabTitle?: string;
    tabIcon?: string;
    tabColCount?: number;
}
export interface StepperFieldConfig extends BaseContainerConfig {
    type: 'stepper';
    name?: string;
    stepperOptions?: {
        showNavButtons?: boolean;
        showTitle?: boolean;
        orientation?: 'horizontal' | 'vertical';
    };
}
export interface StepFieldConfig extends BaseContainerConfig {
    type: 'step';
    name?: string;
    stepTitle?: string;
    stepIcon?: string;
}
export interface ButtonFieldConfig extends Omit<BaseFieldConfig, 'stylingMode'> {
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
export interface EmptyFieldConfig extends BaseFieldConfig {
    type: 'empty';
}
export interface InfoFieldConfig extends BaseFieldConfig {
    type: 'info';
    text?: string;
    html?: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
    icon?: boolean | string;
    dismissible?: boolean;
}
export interface ComputedRule {
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
export type FieldConfig = TextFieldConfig | NumberFieldConfig | DateFieldConfig | DateTimeFieldConfig | TimeFieldConfig | DateRangeFieldConfig | BooleanFieldConfig | SwitchFieldConfig | DropdownFieldConfig | TagBoxFieldConfig | RadioGroupFieldConfig | SliderFieldConfig | RangeSliderFieldConfig | TextAreaFieldConfig | HtmlEditorFieldConfig | ColorBoxFieldConfig | AutocompleteFieldConfig | LookupFieldConfig | CalendarFieldConfig | GridFieldConfig | TreeFieldConfig | FormFieldConfig | GroupFieldConfig | TabbedFieldConfig | TabFieldConfig | StepperFieldConfig | StepFieldConfig | ButtonFieldConfig | EmptyFieldConfig | InfoFieldConfig;
