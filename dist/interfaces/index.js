/**
 * All supported crossField validation types.
 * The type name IS the callback name - no conversion needed.
 */
export const CROSS_FIELD_TYPES = [
    'equals',
    'notEquals',
    'greaterThan',
    'lessThan',
    'sumEquals',
    'percentageSum',
    'dateInRange',
    'atLeastOne',
];
/**
 * Every supported field type, as a runtime list.
 *
 * Consumers map these onto their own concepts (the embed picks a DevExtreme editor, the
 * results grid picks a column data type). Exposing the list at runtime lets those mappings
 * be checked for completeness by a test, instead of a missing type silently falling through
 * to a default.
 */
export const FIELD_TYPES = [
    // Data types
    'autocomplete',
    'calendar',
    'checkbox',
    'colorbox',
    'date',
    'daterange',
    'dropdown',
    'dropdownbox',
    'htmleditor',
    'lookup',
    'number',
    'radiogroup',
    'rangeslider',
    'selectbox',
    'slider',
    'switch',
    'tagbox',
    'text',
    'textarea',
    'boolean',
    'time',
    'datetime',
    // Complex types
    'grid',
    'tree',
    'form',
    // Structural types
    'group',
    'tabbed',
    'tab',
    'stepper',
    'step',
    'button',
    'empty',
    'info',
];
