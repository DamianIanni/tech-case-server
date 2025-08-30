/**
 * Helper function to properly mock imported functions in JavaScript tests
 * @param {Object} module - The imported module containing the function to mock
 * @param {string} functionName - The name of the function to mock
 * @param {*} returnValue - The value to be returned by the mocked function
 */
function mockFunction(module, functionName, returnValue) {
  if (typeof returnValue === 'function') {
    jest.spyOn(module, functionName).mockImplementation(returnValue);
  } else {
    jest.spyOn(module, functionName).mockResolvedValue(returnValue);
  }
}

module.exports = {
  mockFunction
};
