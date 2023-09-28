import {
  Table,
  Column,
  Model,
  ForeignKey,
  Index,
  DataType,
  //   HasOne,
  //   BelongsToMany,
} from 'sequelize-typescript';
import { PatientRecord } from './Patients_record';
import { Doctor } from './Doctors';
// import {Patie}

@Table
export class PatientResult extends Model {
  @ForeignKey(() => PatientRecord)
  @Index
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  patient_record_id: number;

  @ForeignKey(() => Doctor)
  @Index
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  doctor_id: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    type: DataType.TEXT,
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  doctor_comment: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  doctors_assessment: number;
}
