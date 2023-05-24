const { HttpError } = require("../helpers/index");

const {
  Contact,
  addContactSchema,
  changeContactSchema,
  updateFavoriteSchema,
} = require("../models/contact");

const { ctrlWrapper } = require("../helpers/index");

const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
  // res.status(204).send();
};

const changeContact = async (req, res) => {
  const { error } = changeContactSchema.validate(req.body);

  console.log(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  console.log(req.body);

  if (error) {
    throw HttpError(400, "missing field favorite");
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContacts: ctrlWrapper(deleteContacts),
  changeContact: ctrlWrapper(changeContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
