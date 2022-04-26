import { InMemoryDbService } from "angular-in-memory-web-api";
import { MailDB } from "./mails";
import { CountryDB } from "./countries";
import { ChatDB } from "./chat-db";
import { InvoiceDB } from "./invoices";
import { UserDB } from "./users";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      invoices: InvoiceDB.invoices,
      mails: MailDB.messages,
      countries: CountryDB.countries,
      contacts: ChatDB.contacts,
      "chat-collections": ChatDB.chatCollection,
      "chat-user": ChatDB.user,
      users: UserDB.users,
    };
  }
}
