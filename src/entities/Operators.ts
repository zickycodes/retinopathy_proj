import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  //   BelongsToMany,
} from 'sequelize-typescript';
import { PatientRecord } from './Patients_record';
import { Hospital } from './Hospital';

@Table
export class Operator extends Model {
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Email is required' }, // add a validation message
    },
  })
  first_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  last_name: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  email: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  phone_no: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  password: string;

  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Patient Id is required' }, // add a validation message
    },
  })
  hospital_id: number;

  @HasMany(() => PatientRecord)
  patient_record: PatientRecord[];

  @BelongsTo(() => Hospital)
  hospital: Hospital;
}
