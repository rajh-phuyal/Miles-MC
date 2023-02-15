import _ from 'lodash'

const lodashPlugin = {
	install(Vue, options){
		options
		Vue.prototype._ = _
	},
};

export default lodashPlugin