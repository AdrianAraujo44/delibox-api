const complementModel = require("../models/complement")
const productModel = require("../models/product")

const add = async (req, res) => {
  try {
    const { title, deliveryId, rules, itens } = req.body
    const newComplement = new complementModel({
      title,
      deliveryId,
      rules: {
        mandatory: rules.mandatory,
        maxChoiceItem: rules.maxChoiceItem,
        maxItens: rules.maxItens
      },
      itens
    })
    await newComplement.save()

    res.status(200).json({ type: "success", message: "complemento criado com sucesso!" })

  } catch (err) {
    res.status(500).json(err)
  }
}

const getAll = async (req, res) => {
  try {
    const { deliveryId } = req.params
    const response = await complementModel.find({ deliveryId })

    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
}

const getOne = async (req, res) => {
  try {
    const { complementId } = req.params
    const response = await complementModel.findById(complementId)
    if (response != null) {
      res.status(200).json(response)
    } else {
      res.status(200).json({ type: 'warning', message: 'complemento não encontrado!' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateOne = async (req, res) => {
  try {
    const { complementId } = req.params
    const { title, rules, itens } = req.body
    await complementModel.updateOne({ _id: complementId }, { title, rules, itens })

    res.status(200).json({ type: 'success', message: "complemento atualizado com sucesso!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteOne = async (req, res) => {
  try {
    const { complementId } = req.params
     await productModel.updateMany({
      '$pull': {
        complementId: complementId
      }
    })

    await complementModel.deleteOne({_id: complementId})
    res.status(200).json({type:'success', message: "complemento deletado!"})
  } catch (err) {
    res.status(500).json(err)
  }
}

const complementController = {
  add,
  getAll,
  getOne,
  updateOne,
  deleteOne
}

module.exports = { complementController }