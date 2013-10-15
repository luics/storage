/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Sep 17 19:40
*/
/**
 * @ignore
 * @fileOverview dom-attr
 * @author yiminghe@gmail.com, lifesinger@gmail.com
 */
KISSY.add('dom/attr', function (S, DOM, UA, undefined) {


}, {
    requires: ['./base', 'ua']
});

KISSY.add('dom/base', function (S, UA, undefined) {



}, {
    requires: ['ua']
});


KISSY.add('dom/class', function (S, DOM, undefined) {


}, {
    requires:['dom/base']
});


KISSY.add('dom/create', function (S, DOM, UA, undefined) {


}, {
    requires:['./base', 'ua']
});


KISSY.add('dom/data', function (S, DOM, undefined) {

}, {
    requires: ['./base']
});

KISSY.add('dom', function (S, DOM) {

}, {
    requires:['dom/attr',
        'dom/class',
        'dom/create',
        'dom/data',
        'dom/insertion',
        'dom/offset',
        'dom/style',
        'dom/selector',
        'dom/style-ie',
        'dom/traversal']
});

KISSY.add('dom/insertion', function (S, UA, DOM) {


}, {
    requires: ['ua', './create']
});


KISSY.add('dom/offset', function (S, DOM, UA, undefined) {


}, {
    requires: ['./base', 'ua']
});


KISSY.add('dom/selector', function (S, DOM, undefined) {


}, {
    requires: ['./base']
});


KISSY.add('dom/style-ie', function (S, DOM, UA, Style) {


}, {
    requires: ['./base', 'ua', './style']
});

KISSY.add('dom/style', function (S, DOM, UA, undefined) {

}, {
    requires: ['dom/base', 'ua']
});


KISSY.add('dom/traversal', function (S, DOM, undefined) {


}, {
    requires: ['./base']
});
