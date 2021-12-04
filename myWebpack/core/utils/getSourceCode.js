/**
 *
 *
 * @param {*} chunk
 * @name  属性入口文件名称
 * @entryModule 入口文件module对象
 * @modules  依赖模块路径
 */

function getSourceCode({ name, entryModule, modules }) {
    return `
  (() => {
    var __webpack_modules__ = {
      ${modules
            .map((module) => {
                return `
          '${module.id}': (module) => {
            ${module._source}
      }
        `;
            })
            .join(',')}
    };
    // The module cache
    var __webpack_module_cache__ = {};

    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
        // no module.id needed
        // no module.loaded needed
        exports: {},
      });

      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

      // Return the exports of the module
      return module.exports;
    }

    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      ${entryModule._source}
    })();
  })();
  `
}

module.exports = getSourceCode