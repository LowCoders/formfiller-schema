// Forward declaration for ConditionalExpression (used in ValidationRule.when)
export type ConditionalExpression =
  | { [field: string]: any } // Scalar or array shorthand: { field: value } or { field: [values] } or { field: ['operator', value] }
  | { and: ConditionalExpression[] } // AND logic
  | { or: ConditionalExpression[] } // OR logic
  | { not: ConditionalExpression }; // NOT logic

/**
 * Unified type for validation condition (same as ConditionalExpression)
 * Used in ValidationRule.when property
 */
export type ValidationCondition = ConditionalExpression;

// Base interfaces
export interface ValidationRule {
  type: // Basic types (DevExtreme compatible)
    | 'required'
    | 'stringLength'
    | 'arrayLength'
    | 'range'
    | 'pattern'
    | 'email'
    | 'numeric'
    | 'compare'
    | 'custom'
    // Extended types
    | 'async' // External API validation
    | 'crossField' // Multiple field comparison (legacy, prefer crossField* types)
    | 'computed' // Calculation without validation (scoring, aggregation)
    | 'temporal' // Time-dependent validation
    | 'plugin' // Pluggable validation
    // CrossField validator types (new format - type contains the validator name)
    | 'crossFieldEquals' // Fields must be equal
    | 'crossFieldNotEquals' // Fields must not be equal
    | 'crossFieldGreaterThan' // First field > second field
    | 'crossFieldLessThan' // First field < second field
    | 'crossFieldSumEquals' // Sum of fields equals target
    | 'crossFieldPercentageSum' // Fields sum to 100%
    | 'crossFieldDateInRange' // Date within range of other dates
    | 'crossFieldAtLeastOne' // At least one field has value
    | 'crossFieldCustom'; // Custom crossField validator

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

  // === NEW: Conditional expression support ===
  /**
   * Conditional expression that determines when this validation rule should be applied.
   * Supports the same 3 specification modes as visibleIf:
   * 1. Simple equality: { field: value }
   * 2. Implicit "in": { field: [value1, value2] }
   * 3. Explicit operator: { field: ['operator', value] }
   * Plus logical operators: and, or, not
   */
  when?: ValidationCondition;

  // stringLength & range properties
  min?: number;
  max?: number;

  // pattern property
  pattern?: string | RegExp;

  // compare properties
  comparisonTarget?: string;
  comparisonType?: '==' | '!=' | '<' | '>' | '<=' | '>=';

  // custom property
  validationCallback?: string | ((value: any, context: any) => boolean | Promise<boolean>);

  // Async validation (external API)
  apiEndpoint?: string;
  apiMethod?: 'GET' | 'POST';
  apiPayload?: Record<string, any>;
  apiTimeout?: number;

  // CrossField validation
  targetFields?: string[];
  crossFieldValidator?:
    | string
    | { name: string; params?: Record<string, any> }
    | ((values: Record<string, any>, context: any) => boolean);

  // Computed (for calculations)
  compute?: string | ((values: Record<string, any>, context: any) => any);
  returnToFrontend?: boolean;
  storeResult?: boolean;

  // Computed validation subtypes
  subtype?: 'exactMatch' | 'arrayMatch' | 'numericMatch' | 'keywordMatch' | 'custom';
  correctAnswer?: any;
  points?: number;
  penalty?: number;
  partialCredit?: boolean; // Allow partial points for partial correctness
  tolerance?: number; // For numericMatch
  keywords?: {
    required?: string[];
    optional?: string[];
  };
  minLength?: number; // For keywordMatch
  customEvaluator?: string; // Custom computed function name

  // Temporal validation
  validFrom?: Date | string;
  validUntil?: Date | string;
  schedule?: string; // cron expression
  timezone?: string;
  gracePeriod?: number; // ms

  // Plugin validation
  pluginName?: string;
  pluginConfig?: Record<string, any>;

  // DEPRECATED (for backward compatibility)
  value?: number; // migrated to min/max
  validator?: string; // migrated to validationCallback
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
  // Legacy format
  operator?: 'and' | 'or' | 'not';
  rules?: Array<ValidationRule | ValidationRuleGroup>;
  message?: string; // Custom message for the entire group (legacy)

  // New format (JSON Schema compatible)
  and?: Array<ValidationRule | ValidationRuleGroup>;
  or?: Array<ValidationRule | ValidationRuleGroup>;
  not?: ValidationRule | ValidationRuleGroup;
  groupMessage?: string; // Custom message for the entire group (new format)

  // Common
  stopOnFirstError?: boolean; // Stop evaluating on first error
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
  operator:
    | '=='
    | '!='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'in'
    | 'notIn'
    | 'contains'
    | 'startswith'
    | 'endswith';
  value: any;
  logicalOperator?: 'and' | 'or';
}

// ConditionalExpression is now defined at the top (before ValidationRule) for forward declaration

export interface LookupConfig {
  dataSource: any[];
  displayExpr?: string;
  valueExpr?: string;
  setCellValue?: boolean;
  dependsOn?: string[]; // Fields that this lookup depends on
}

export interface BaseFieldConfig {
  name?: string;
  dataField?: string; // DevExtreme data binding field name (alias for name)
  label?:
    | string
    | {
        text?: string;
        visible?: boolean;
        showColon?: boolean;
        location?: 'left' | 'right' | 'top';
        alignment?: 'left' | 'right' | 'center';
        [key: string]: any; // Additional DevExtreme label options
      };

  // State
  visible?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  // Layout
  colSpan?: number; // Number of columns the field should span in the form layout

  // Value
  value?: any; // Initial/default value

  // Selector field options (radiogroup, tagbox, dropdown, selectbox, lookup)
  // Note: For container types (group, tabbed) 'items' is overridden to FieldConfig[]
  options?: Array<string | { value: any; text?: string; [key: string]: any }>;
  valueExpr?: string; // Default: 'value'
  displayExpr?: string; // Default: 'text'

  // Méret
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;

  // UI
  placeholder?: string;
  showClearButton?: boolean;

  // Validáció
  validationRules?: ValidationRuleOrGroup[];
  visibleIf?: ConditionalExpression;
  disabledIf?: ConditionalExpression;
  readonlyIf?: ConditionalExpression;
  requiredIf?: ConditionalExpression;
  validationMessageMode?: 'always' | 'auto'; // When to display validation messages
  validationMessagePosition?: 'bottom' | 'top' | 'left' | 'right'; // Where to display validation messages

  // Path-based references
  dependentFields?: string[];
  references?: string[];

  // UI customization
  cssClass?: string;
  helpText?: string;
  stylingMode?: 'outlined' | 'underlined' | 'filled'; // Visual styling mode

  // Accessibility
  tabIndex?: number; // Tab navigation order
  hint?: string; // Tooltip text
  accessKey?: string; // Keyboard shortcut
  inputAttr?: Record<string, any>; // HTML attributes (id, data-*, aria-*)

  // Lookup
  lookup?: LookupConfig;

  // Special configurations
  editMode?: 'form' | 'cell' | 'row' | 'batch' | 'popup'; // Grid and Tree editing mode

  // Grid/Tree column specific properties
  allowEditing?: boolean; // Whether the column is editable in grid/tree context
  allowSorting?: boolean; // Whether the column is sortable
  allowFiltering?: boolean; // Whether the column is filterable

  // DevExtreme general editor options
  // Any type-specific settings supported by the DevExtreme editor
  editorOptions?: Record<string, any>;
}

// Field type definitions
export type FieldType =
  // Data types
  | 'autocomplete'
  | 'calendar'
  | 'checkbox'
  | 'colorbox'
  | 'date'
  | 'daterange'
  | 'dropdown'
  | 'dropdownbox'
  | 'htmleditor'
  | 'lookup'
  | 'number'
  | 'radiogroup'
  | 'rangeslider'
  | 'selectbox'
  | 'slider'
  | 'switch'
  | 'tagbox'
  | 'text'
  | 'textarea'
  | 'boolean'
  | 'time'
  | 'datetime'
  // Complex types
  | 'grid'
  | 'tree'
  | 'form'
  // Structural types
  | 'group'
  | 'tabbed'
  | 'tab'
  | 'stepper'
  | 'step'
  | 'button'
  | 'empty'
  | 'info';

// Number format configuration for DevExtreme NumberBox
export interface NumberFormat {
  type?:
    | 'currency'
    | 'percent'
    | 'decimal'
    | 'fixedPoint'
    | 'exponential'
    | 'thousands'
    | 'millions'
    | 'billions'
    | 'trillions'
    | 'largeNumber';
  precision?: number;
  currency?: string; // Currency code (e.g., "USD", "EUR", "HUF")
}

// Data field configs
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text';
  mode?: 'text' | 'password' | 'email' | 'tel' | 'url';
  maxLength?: number;
  // DevExtreme TextBox mask support
  mask?: string; // Mask pattern (e.g., "+1 (000) 000-0000")
  maskRules?: Record<string, RegExp>; // Custom mask rules (e.g., { X: /[02-9]/ })
  maskChar?: string; // Placeholder character for mask (default: '_')
  maskInvalidMessage?: string; // Error message for invalid mask input
  useMaskedValue?: boolean; // Whether to use the masked value (default: false)
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  showSpinButtons?: boolean;
  // DevExtreme NumberBox format support
  format?: string | NumberFormat; // Number format (string pattern or format object)
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
  interval?: number; // Minutes interval (5, 10, 15, 30, 60)
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
  grouped?: boolean; // Enable grouped items
  noDataText?: string; // Text when no data available
  wrapItemText?: boolean; // Wrap long text in items
  dropDownOptions?: Record<string, any>; // Dropdown widget configuration
}

export interface TagBoxFieldConfig extends BaseFieldConfig {
  type: 'tagbox';
  lookup?: LookupConfig;
  searchEnabled?: boolean;
  acceptCustomValue?: boolean;
  showDropDownButton?: boolean;
  showSelectionControls?: boolean; // Show "Select All" checkbox
  applyValueMode?: 'instantly' | 'useButtons'; // When to apply selected values
  maxDisplayedTags?: number; // Max visible tags before "+N"
  selectAllMode?: 'allPages' | 'page'; // Select all behavior
  hideSelectedItems?: boolean; // Hide selected items from dropdown
  maxFilterQueryLength?: number; // Max search query length
  selectAllText?: string; // Custom "Select All" text
}

export interface RadioGroupFieldConfig extends BaseFieldConfig {
  type: 'radiogroup';
  lookup?: LookupConfig;
  layout?: 'horizontal' | 'vertical';
}

export interface SliderFieldConfig extends BaseFieldConfig {
  type: 'slider';
  min?: number; // Minimum value
  max?: number; // Maximum value
  step?: number; // Increment step
  showRange?: boolean; // Show range indicator
  tooltip?: {
    enabled?: boolean; // Use 'enabled' NOT 'isShown' - show/hide tooltip
    format?: string; // Number format (e.g., "#0.##")
    showMode?: 'always' | 'onHover'; // When to display tooltip
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
  lookup: LookupConfig; // Required for lookup type
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

// Form-specific preferences and settings
export interface FormPreferences {
  addSaveBtn?: boolean; // Automatically add save button at the end of form
  saveLimit?: number | null; // Maximum number of saves allowed (quota)
  saveUrl?: string; // Optional custom save endpoint URL
  computedRuleResults?: 'none' | 'score' | 'detailed'; // How to display computed validation results
  storeComputedResults?: boolean; // Whether to store computed results in form data

  /**
   * Show validation errors in a summary accordion at the top of the form
   * @default true
   */
  showErrorsOnFormLevel?: boolean;
}

// Forward declaration for recursive types
export interface ItemConfig {
  id?: string; // Optional - backend provides _id instead
  _id?: string; // MongoDB ObjectId (optional in tests, required - provided by backend in runtime)
  title?: string; // Optional - backend provides from top-level title
  label?: string; // Display label (legacy, prefer title)
  description?: string;
  type?: 'grid' | 'tree' | 'form'; // Optional - backend provides from top-level type
  configId?: string; // Slug-objectId format or ObjectId
  slug?: string; // URL-friendly slug
  name?: string;
  items: FieldConfig[]; // ← Changed from columns to items
  addSaveBtn?: boolean; // Add save button at the end of form (legacy, prefer preferences.addSaveBtn)
  validationRules?: ValidationRuleOrGroup[]; // Form-level validation rules
  computedRules?: ComputedRule[]; // Form-level computed rules for aggregation
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
    enabled?: boolean; // Export enabled
    fileName?: string; // Default file name
    formats?: ('xlsx' | 'pdf')[]; // Formats
  };
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  dataPath?: string;
  onRowClick?: string;
  onCellClick?: string;
  onRowDblClick?: string;
  keyExpr?: string; // For tree
  parentIdExpr?: string; // For tree

  // DevExtreme Tree/Grid-specific display options
  autoExpandAll?: boolean; // Auto-expand all tree nodes
  showRowLines?: boolean; // Show lines between rows
  showBorders?: boolean; // Show borders around the grid/tree
  columnAutoWidth?: boolean; // Auto-width for columns
  allowColumnReordering?: boolean; // Allow column reordering
  allowColumnResizing?: boolean; // Allow column resizing
  showColumnHeaders?: boolean; // Show column headers
}

// Root-level form configuration object
export interface FormConfig {
  _id?: string; // MongoDB ObjectId
  title: string; // Form title
  description?: string; // Form description
  slug?: string; // URL-friendly slug
  preferences?: FormPreferences; // Form-specific preferences
  itemConfig: ItemConfig; // Item configuration (formerly ViewConfig)
  isActive?: boolean; // Whether the form is active
  createdBy?: string; // User ID who created the form
  tags?: string[]; // Tags for categorization
  version?: string; // Schema version
  isPublic?: boolean; // Whether the form is public
  allowedUsers?: string[]; // Array of user IDs with access
  createdAt?: Date; // Creation timestamp
  updatedAt?: Date; // Update timestamp
}

// Backward compatibility alias
/** @deprecated Use ItemConfig instead */
export type ViewConfig = ItemConfig;

// Forward declaration for recursive types

// Complex field configs
export interface GridFieldConfig extends BaseFieldConfig {
  type: 'grid';
  config: ItemConfig; // ← Changed from gridConfig to config
}

export interface TreeFieldConfig extends BaseFieldConfig {
  type: 'tree';
  config: ItemConfig; // ← Changed from treeConfig to config
}

export interface FormFieldConfig extends BaseContainerConfig {
  type: 'form';
  config?: ItemConfig | FieldConfig[]; // ← Changed from formConfig to config
}

// Base container interface for structural fields
export interface BaseContainerConfig extends BaseFieldConfig {
  items?: FieldConfig[];
  excludeFromPath?: boolean; // ✅ When true, the group/container element name is excluded from child field paths. Typically used for structural elements without captions. Default: false
}

// Structural field configs
export interface GroupFieldConfig extends BaseContainerConfig {
  type: 'group';
  name?: string; // Optional - can be omitted for anonymous groups
  caption?: string; // Group header caption text
  captionRender?: string; // Custom render function name for caption
  colCount?: number | 'auto'; // Use this for multi-column layouts (default: 1)
}

export interface TabbedFieldConfig extends BaseContainerConfig {
  type: 'tabbed';
  name?: string; // Optional - can be omitted for anonymous tabbed containers
  tabPanelOptions?: any;
  // items already exists in BaseContainerConfig
}

export interface TabFieldConfig extends BaseContainerConfig {
  type: 'tab';
  name?: string; // Optional - can be omitted for anonymous tabs
  tabTitle?: string;
  tabIcon?: string;
  tabColCount?: number;
  // items already exists in BaseContainerConfig
}

export interface StepperFieldConfig extends BaseContainerConfig {
  type: 'stepper';
  name?: string; // Optional - can be omitted for anonymous steppers
  stepperOptions?: {
    showNavButtons?: boolean;
    showTitle?: boolean;
    orientation?: 'horizontal' | 'vertical';
  };
  // items already exists in BaseContainerConfig
}

export interface StepFieldConfig extends BaseContainerConfig {
  type: 'step';
  name?: string; // Optional - can be omitted for anonymous steps
  stepTitle?: string;
  stepIcon?: string;
  // items already exists in BaseContainerConfig
}

export interface ButtonFieldConfig extends Omit<BaseFieldConfig, 'stylingMode'> {
  type: 'button';
  // Legacy properties (prefer buttonOptions)
  text?: string; // Button text (use buttonOptions.text instead)
  title?: string; // Button title/tooltip
  icon?: string; // Button icon (use buttonOptions.icon instead)
  buttonType?: 'normal' | 'success' | 'default' | 'danger' | 'back'; // Use buttonOptions.type instead
  stylingMode?: 'text' | 'outlined' | 'contained'; // Button styling mode (different from input fields)
  action?: ((...args: any[]) => void) | string; // Click action handler
  horizontalAlignment?: 'left' | 'center' | 'right'; // Horizontal alignment in form
  verticalAlignment?: 'top' | 'center' | 'bottom'; // Vertical alignment in form
  buttonOptions?: {
    text?: string;
    icon?: string;
    type?: 'normal' | 'success' | 'default' | 'danger' | 'back';
    stylingMode?: 'text' | 'outlined' | 'contained';
    width?: number | string;
    height?: number | string;
    disabled?: boolean;
    onClick?:
      | string
      | {
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
  text?: string; // Info box text content (plain text, supports \n for line breaks)
  html?: string; // HTML content to display (takes precedence over text if both provided)
  variant?: 'info' | 'success' | 'warning' | 'error'; // Visual style variant
  icon?: boolean | string; // Show icon (true = auto variant icon, string = custom icon name)
  dismissible?: boolean; // Whether the info box can be dismissed/closed
}

// Union type for all field configs
// Form-level computed rule for field evaluation and aggregation
export interface ComputedRule {
  id: string;
  name: string;
  type: 'field' | 'aggregate'; // Field-level or aggregate computation

  // Field type properties (when type === 'field')
  fieldName?: string; // Target field name (e.g., "networking.q1_http_port")
  subtype?: 'exactMatch' | 'arrayMatch' | 'numericMatch' | 'keywordMatch' | 'custom';
  correctAnswer?: any; // Expected correct answer
  keywords?: {
    // For keywordMatch subtype
    required?: string[];
    optional?: string[];
  };
  points?: number; // Points awarded for correct answer
  penalty?: number; // Points deducted for incorrect answer
  partialCredit?: boolean; // Allow partial credit for partially correct answers
  tolerance?: number; // Tolerance for numeric comparisons
  minLength?: number; // Minimum length for text answers
  message?: string; // Error message for incorrect answer

  // Aggregate type properties (when type === 'aggregate')
  inputFields?: string[]; // Field names to aggregate
  categoryMapping?: Record<string, string>; // Map fields to categories
  evaluationRules?: Array<{
    // Rules for evaluating aggregate score
    condition: ConditionalExpression;
    result: string;
    message: string;
  }>;

  // Common properties
  returnToFrontend?: boolean; // Whether to send results to frontend
  storeResult?: boolean; // Whether to store results in database
}

export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | DateTimeFieldConfig
  | TimeFieldConfig
  | DateRangeFieldConfig
  | BooleanFieldConfig
  | SwitchFieldConfig
  | DropdownFieldConfig
  | TagBoxFieldConfig
  | RadioGroupFieldConfig
  | SliderFieldConfig
  | RangeSliderFieldConfig
  | TextAreaFieldConfig
  | HtmlEditorFieldConfig
  | ColorBoxFieldConfig
  | AutocompleteFieldConfig
  | LookupFieldConfig
  | CalendarFieldConfig
  | GridFieldConfig
  | TreeFieldConfig
  | FormFieldConfig
  | GroupFieldConfig
  | TabbedFieldConfig
  | TabFieldConfig
  | StepperFieldConfig
  | StepFieldConfig
  | ButtonFieldConfig
  | EmptyFieldConfig
  | InfoFieldConfig;
