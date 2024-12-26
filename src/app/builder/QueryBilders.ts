import { Query } from 'mongoose';

class QueryBuilders<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchingFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchingFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'page', 'fields'];
    excludeFields.map((item) => delete queryObj[item]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sortedQuery = this?.query?.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortedQuery as string);
    return this;
  }

  pagination() {
    const page = Number(this?.query?.page || 1);
    const limit = 2;
    const skip = (page - 1) * limit; /// (page-1)*limit
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilders;
