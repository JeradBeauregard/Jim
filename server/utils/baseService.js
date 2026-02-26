// template for base crud

function baseService(Model) {
  return {
    getAll: () => Model.find(),
    getById: (id) => Model.findById(id),
    create: (data) => Model.create(data),
    update: (id, data) => Model.findByIdAndUpdate(id, data, { new: true }),
    remove: (id) => Model.findByIdAndDelete(id)
  };
}

export default baseService;