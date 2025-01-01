/*:
 * @target MZ
 * @plugindesc Customizes the text box position and allows toggling with custom X and Y coordinates.
 * @author Vivienne Ooi
 *
 * @command Enable
 * @text Enable Custom Text Position
 * @desc Enables the custom text box position with specified X and Y coordinates.
 *
 * @arg x
 * @text X Coordinate
 * @desc The X position of the text box.
 * @default 0
 *
 * @arg y
 * @text Y Coordinate
 * @desc The Y position of the text box.
 * @default 0
 *
 * @command Disable
 * @text Disable Custom Text Position
 * @desc Disables the custom text box position, reverting to default placement.
 *
 * @help
 * This plugin adjusts the text box's X and Y position dynamically.
 * You can enable or disable this functionality using plugin commands.
 *
 * === Plugin Commands ===
 * - Enable: Activates the custom positioning and sets the X and Y coordinates.
 * - Disable: Deactivates the custom positioning, reverting to default behavior.
 */

(() => {
  // Global variables to control custom positioning
  let isCustomPositionEnabled = true;
  let customX = 0;
  let customY = 0;

  // Override the updatePlacement method
  const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function() {
      _Window_Message_updatePlacement.call(this);
      if (isCustomPositionEnabled) {
          this.x = customX;
          this.y = customY;
      }
  };

  // Enable Plugin Command
  PluginManager.registerCommand("CustomTextPosition", "Enable", args => {
      isCustomPositionEnabled = true;
      customX = Number(args.x);
      customY = Number(args.y);
  });

  // Disable Plugin Command
  PluginManager.registerCommand("CustomTextPosition", "Disable", () => {
      isCustomPositionEnabled = false;
  });
})();
