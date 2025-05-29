import * as contactsService from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

const getAllContacts = async (req, res) => {
  const result = await contactsService.getAllContacts(req.user._id, req.query);
  res.json({
    status: 'success',
    data: result
  });
};

const getContactById = async (req, res) => {
  const contact = await contactsService.getContactById(req.user._id, req.params.id);
  res.json({
    status: 'success',
    data: contact
  });
};

const createContact = async (req, res) => {
  const newContact = req.body;
  const photo = req.file;

  let photoUrl = null;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const contact = await contactsService.createContact(req.user._id, {
    ...newContact,
    photo: photoUrl
  });

  res.status(201).json({
    status: 'success',
    data: contact
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const photo = req.file;

  let photoUrl = null;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  if (photoUrl) {
    updateData.photo = photoUrl;
  }

  const contact = await contactsService.updateContact(req.user._id, id, updateData);
  res.json({
    status: 'success',
    data: contact
  });
};

const deleteContact = async (req, res) => {
  await contactsService.deleteContact(req.user._id, req.params.id);
  res.status(204).send();
};

export const contactsController = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact)
};
