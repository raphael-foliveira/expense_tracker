import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer")
  amount: number;

  @Column()
  description: string;

  @Column({ default: () => `CURRENT_TIMESTAMP` })
  date: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;
}
