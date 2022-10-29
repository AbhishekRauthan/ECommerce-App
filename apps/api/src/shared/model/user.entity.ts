import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Roles } from '../../types/index.types';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.User,
  })
  role: Roles;

  @Column()
  balance: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getRole(): string {
    return this.role;
  }

  setRole(role: Roles) {
    this.role = role;
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(balance: number) {
    this.balance = balance;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  setOrders(orders: Order[]) {
    this.orders = orders;
  }
}
