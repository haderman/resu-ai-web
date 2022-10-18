/**
 * I took this function from
 * https://github.dev/fauna-labs/fwitter/blob/327d3be0003d8d550eabe533ba6b9c8406e0847a/src/fauna/helpers/errors.js#L26
 */
const handleSetupError = (promise, entity) => {
  return promise
    .then(data => {
      console.log(`   [ Executed ] '${entity}'`);
      return data;
    })
    .catch(error => {
      if (error && error.message === 'instance already exists') {
        console.warn(`   [ Skipped ] '${entity}', it already exists`);
      } else {
        console.error(`   [ Failed  ] '${entity}', with error:`, error);
      }
    });
};

export { handleSetupError };
