import { axiosClient } from "../common/contexts/AxiosContext";
import { Endoints } from "../common/types";

const messagesEndpoint = Endoints.Messages;

const createMessage = (data) => axiosClient.post(`${messagesEndpoint}`, data);

const getContacts = () => axiosClient.get(`${messagesEndpoint}/contacts`);

const getContactMessages = (ContactId: string) =>
  axiosClient.get(`${messagesEndpoint}/user/${ContactId}`);

export { createMessage, getContacts, getContactMessages };
