# Back-End API Structure

## Object Structures

```typescript
type User = {
  id: number;
  name: string;
  password: string;
  role: string;
  balance: string;
  order: Order[];
};
```

```typescript
type Order = {
  id: number;
  total: number;
  date: Date;
  user: User;
  item: Item[];
};
```

```typescript
type Item = {
  id: number;
  quality: number;
  price: number;
  order: Order;
  product: Product;
};
```

```typescript
type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  item: Item[];
};
```

## Login/Register for user of role _customer_ structure

```typescript
type login = {
  // ask user theirs user name or login email
  name?: string;
  email?: string;
  password: string;
};
```

```typescript
type register = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};
```

## Login/Register for user of role _admin_ structure

```typescript
type login = {
  email: string;
  password: string;
};
```

```typescript
type register = {
  email: string;
  password: string;
  confirmPassword: string;
};
```
