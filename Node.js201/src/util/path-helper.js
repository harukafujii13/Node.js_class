module.exports = {
  srcDir: require.main.path,
  rootDir: process.cwd(),
};

//srcDir: It is assigned the value require.main.path. This property represents the source directory of the main module.
//require.main is a reference to the module that was initially executed by Node.js, and require.main.path provides the absolute path to that module's directory.

//rootDir: It is assigned the value process.cwd().
//This property represents the current working directory of the Node.js process. process.cwd() returns the absolute path of the current working directory.
