import request from '@/utils/request'
class RestFulApiGen {
	constructor() {
		this.modules = {}
	}

	getModule(moduleName) {
		return this.modules[moduleName]
	}

	create(moduleName) {
		if (typeof moduleName !== 'string') {
			return console.error('moduleName must be string');
		}
		if (this.modules[moduleName]) {
			return this.modules[moduleName]
		}
		return this.modules[moduleName] = this.installModule(moduleName)
	}

	installModule(moduleName) {
		const instance = {}
		instance.list = function listModule(params) {
			return request({
				url: `/${moduleName}`,
				method: 'get'
			})
		}
		instance.create = function createModuleItem(params) {
			return request({
				url: `/${moduleName}/create`,
				method: 'post',
				data: params
			})
		}
		instance.delete = function deleteModuleItem(id) {
			return request({
				url: `/${moduleName}/destroy/${id}`,
				method: 'delete'
			})
		}
		instance.update = function updateModuleItem(id, params) {
			return request({
				url: `/${moduleName}/update/${id}`,
				method: 'patch',
				data: params
			})
		}

		return instance
	}
}

export default RestFulApiGen
