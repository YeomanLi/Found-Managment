const mongoose = require('mongoose')
const Info = require('../model/Info')

const infoController = {
  /**
   * add fund info feature
   */
  addInfo(req, res) {
    const infoFields = {}
    if (req.body.type)    infoFields.type = req.body.type
    if (req.body.description)    infoFields.description = req.body.description
    if (req.body.income)    infoFields.income = req.body.income
    if (req.body.expend)    infoFields.expend = req.body.expend
    if (req.body.cash)    infoFields.cash = req.body.cash
    if (req.body.remark)    infoFields.remark = req.body.remark
    new Info(infoFields).save()
                        .then(newInfo => res.json(newInfo))
  },

  /**
   * delete fund info feature
   */
  deleteInfo(req, res) {
    Info.findOneAndDelete({ _id: req.params.id })
        .then(info => res.json({msg: 'ok', info}))
        .catch(error => res.status(404).json({error, msg: 'delete failed'}))
  },

  /**
   * update fund info feature
   */
  editInfo(req, res) {
    const newInfoFields = {}
    if (req.body.type)    newInfoFields.type = req.body.type
    if (req.body.description)    newInfoFields.description = req.body.description
    if (req.body.income)    newInfoFields.income = req.body.income
    if (req.body.expend)    newInfoFields.expend = req.body.expend
    if (req.body.cash)    newInfoFields.cash = req.body.cash
    if (req.body.remark)    newInfoFields.remark = req.body.remark
    Info.findOneAndUpdate(
      { _id: req.params.id },
      { $set: newInfoFields },
      { new: true }
    ).then(newInfo => res.json(newInfo))
     .catch(error => res.json(error))
  },

  /**
   * query single fund info feature
   */
  queryById(req, res) {
    Info.findById(req.params.id)
        .then(singleInfo => {
          if (!singleInfo)  res.status(404).json({ msg: 'no info' })
          res.json(singleInfo)
        })
        .catch(error => res.status(404).json({ msg: 'error' }))
  },

  /**
   * query all fund info feature
   */
  queryAllInfo(req, res) {
    Info.find()
        .then(Info => {
          if (!Info)  res.status(404).json({ msg: 'no info' })
          res.json(Info)
        })
        .catch(error => res.status(404).json({ msg: 'error' }))
  }
}
module.exports = infoController