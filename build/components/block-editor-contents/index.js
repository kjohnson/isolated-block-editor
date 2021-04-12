"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _element = require("@wordpress/element");

var _blocks = require("@wordpress/blocks");

var _blockEditorProvider = _interopRequireDefault(require("../block-editor-provider"));

var _blockEditorToolbar = _interopRequireDefault(require("../block-editor-toolbar"));

var _blockEditor = _interopRequireDefault(require("../block-editor"));

var _editorContent = _interopRequireDefault(require("./editor-content"));

import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */

/** @typedef {import('../../index').OnLoad} OnLoad */

/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Get editor selection
 * @callback OnSelection
 */

/**
 * Update callback
 * @callback OnUpdate
 * @param {object[]} blocks - Editor content to save
 */
function getInitialContent(settings, content) {
  return (0, _editorContent["default"])(settings.iso.patterns, settings.iso.currentPattern, settings.editor.template, content);
}
/**
 * The editor itself, including toolbar
 *
 * @param {object} props - Component props
 * @param {object[]} props.blocks
 * @param {OnUpdate} props.updateBlocksWithoutUndo - Callback to update blocks
 * @param {OnUpdate} props.updateBlocksWithUndo - Callback to update blocks
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {object} props.children - Child components
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSelection} props.getEditorSelectionStart
 * @param {OnSelection} props.getEditorSelectionEnd
 * @param {OnLoad} props.onLoad - Load initial blocks
 */


function BlockEditorContents(props) {
  var blocks = props.blocks,
      updateBlocksWithoutUndo = props.updateBlocksWithoutUndo,
      updateBlocksWithUndo = props.updateBlocksWithUndo,
      getEditorSelectionStart = props.getEditorSelectionStart,
      getEditorSelectionEnd = props.getEditorSelectionEnd,
      isEditing = props.isEditing,
      editorMode = props.editorMode;
  var children = props.children,
      settings = props.settings,
      renderMoreMenu = props.renderMoreMenu,
      onLoad = props.onLoad; // Set initial content, if we have any, but only if there is no existing data in the editor (from elsewhere)

  (0, _element.useEffect)(function () {
    var initialContent = getInitialContent(settings, onLoad ? onLoad(_blocks.parse, _blocks.rawHandler) : []);

    if (initialContent.length > 0 && (!blocks || blocks.length === 0)) {
      updateBlocksWithoutUndo(initialContent);
    }
  }, []);
  return createElement(_blockEditorProvider["default"], {
    value: blocks || [],
    onInput: updateBlocksWithoutUndo,
    onChange: updateBlocksWithUndo,
    selectionStart: getEditorSelectionStart(),
    selectionEnd: getEditorSelectionEnd(),
    useSubRegistry: true,
    settings: settings.editor
  }, createElement(_blockEditorToolbar["default"], {
    editorMode: editorMode,
    settings: settings,
    renderMoreMenu: renderMoreMenu
  }), createElement(_blockEditor["default"], {
    isEditing: isEditing,
    editorMode: editorMode
  }, children), createElement(_components.Popover.Slot, null));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('isolated/editor'),
      getBlocks = _select.getBlocks,
      getEditorSelectionStart = _select.getEditorSelectionStart,
      getEditorSelectionEnd = _select.getEditorSelectionEnd,
      getEditorMode = _select.getEditorMode,
      isEditing = _select.isEditing;

  return {
    blocks: getBlocks(),
    getEditorSelectionEnd: getEditorSelectionEnd,
    getEditorSelectionStart: getEditorSelectionStart,
    isEditing: isEditing(),
    editorMode: getEditorMode()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
      updateBlocksWithUndo = _dispatch.updateBlocksWithUndo,
      updateBlocksWithoutUndo = _dispatch.updateBlocksWithoutUndo;

  return {
    updateBlocksWithUndo: updateBlocksWithUndo,
    updateBlocksWithoutUndo: updateBlocksWithoutUndo
  };
})])(BlockEditorContents);

exports["default"] = _default;
//# sourceMappingURL=index.js.map