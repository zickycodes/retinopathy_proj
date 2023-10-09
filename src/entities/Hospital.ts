// import { Model } from 'sequelize';
import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  //   HasOne,
  //   BelongsToMany,
} from 'sequelize-typescript';
import { Operator } from './Operators';

@Table
export class Hospital extends Model {
  @PrimaryKey // Decorate the primary key column with PrimaryKey decorator
  @Column({
    allowNull: false,
    autoIncrement: true, // Add autoIncrement for auto-incrementing primary key
  })
  h_id: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Email is required' }, // add a validation message
    },
    unique: true,
  })
  h_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  h_address: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  h_email: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  h_password: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  h_state: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  h_admin_contact_info: string;

  @HasMany(() => Operator, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  operator: Operator[];
}
