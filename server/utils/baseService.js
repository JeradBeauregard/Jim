// utils/baseService.js
function baseService(Model) {
  return {
    getAll: (filter = {}, options = {}) => Model.find(filter, null, options),

    getById: (id) => Model.findById(id),

    create: (data) => Model.create(data),

    update: (id, data) =>
      Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      }),

    remove: (id) => Model.findByIdAndDelete(id)
  };
}

export default baseService;