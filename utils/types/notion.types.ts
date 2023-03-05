export interface Database {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover?: null;
  icon?: null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

interface TedBy {
  object: string;
  id: string;
}

interface Parent {
  type: string;
  database_id: string;
}

interface Properties {
  Published: Published;
  Date: DateClass;
  slug: Description;
  Status: Status;
  Description: Description;
  Created: Created;
  Name: Name;
}

interface Created {
  id: string;
  type: string;
  created_time: string;
}

interface DateClass {
  id: string;
  type: string;
  date: DateDate;
}

interface DateDate {
  start: string;
  end?: null;
  time_zone?: null;
}

interface Description {
  id: string;
  type: string;
  rich_text: RichText[];
}

interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: null;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Text {
  content: string;
  link?: null;
}

interface Name {
  id: string;
  type: string;
  title: RichText[];
}

interface Published {
  id: string;
  type: string;
  checkbox: boolean;
}

interface Status {
  id: string;
  type: string;
  select?: null;
}
