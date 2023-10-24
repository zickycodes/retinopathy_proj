import {
  Table,
  Column,
  Model,
  BelongsTo,
  DataType,
  //   HasOne,
  //   BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { PatientRecord } from './Patients_record';
import { Doctor } from './Doctors';

@Table
export class PatientDiagnosis extends Model {
  @ForeignKey(() => PatientRecord)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    unique: true,
    validate: {
      notNull: { msg: 'Patient_Record Id required' }, // add a validation message
    },
  })
  patient_record_id: number;

  @ForeignKey(() => Doctor)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Doctor Id required' }, // add a validation message
    },
  })
  doctor_id: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    type: DataType.TEXT,
    validate: {
      notNull: { msg: 'Patient Results is required' }, // add a validation message
    },
  })
  patient_results: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Comments is required' }, // add a validation message
    },
  })
  comments: string;

  @BelongsTo(() => PatientRecord, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  patient_record: PatientRecord;

  @BelongsTo(() => Doctor, {
    onDelete: 'CASCADE', // This line ensures cascading deletion of child records.
    onUpdate: 'CASCADE',
  })
  doctor: Doctor;
}
