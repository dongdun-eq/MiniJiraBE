import { Status } from '../../generated/prisma/client';

export const formatStatus = (status: Status) => {
  return status.replace('_', '-');
};
