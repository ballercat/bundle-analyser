/*eslint-env node, es6 */
import Jasmine from 'jasmine';
var jasmine = new Jasmine();

jasmine.loadConfigFile('./jasmine.json');
jasmine.execute();

