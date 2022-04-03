import Quote from "../entities/Quote";

type CreateType = (quote: Quote) => Promise<boolean>;

export default interface QuoteRepository {
    create: CreateType;
}