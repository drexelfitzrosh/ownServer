import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property({type: 'date'})
  createdAt = new Date();

  @Property({type: 'text'})
  name!: string;

  @Property({type:'text', unique: true})
  email!: string;

  @Property({type:'text'})
  password!: string;

}