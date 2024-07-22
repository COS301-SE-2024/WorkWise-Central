export const isNotDeleted = {
  $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
};
