import {
  Table,
  Column,
  Model,
  BelongsTo,
  //   HasOne,
  //   BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { PatientRecord } from './Patients_record';

@Table
export class PatientDiagnosis extends Model {
  @ForeignKey(() => PatientRecord)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Email is required' }, // add a validation message
    },
  })
  patient_record_id: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  patient_results: string;

  @BelongsTo(() => PatientRecord)
  patient_record: PatientRecord;
}
