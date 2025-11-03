# HTTP Request Hooks Usage Examples

This document demonstrates how to use the custom HTTP request hooks with the global Axios instance that automatically includes authentication tokens from localStorage.

## Setup

The global `Axios` instance is configured in `src/hooks/Axios.ts` and automatically:
- Adds the Bearer token from localStorage to all requests
- Handles 401 Unauthorized responses by removing invalid tokens
- Sets the base URL (configurable via `VITE_API_BASE_URL` environment variable)

## Importing the Hooks

```typescript
import { useGetRequest, usePostRequest, usePutRequest, useDeleteRequest } from "@/hooks";
// Or import individually:
// import { useGetRequest } from "@/hooks/useGetRequest";
```

## useGetRequest

Fetch data from an API endpoint.

### Basic Usage

```typescript
import { useGetRequest } from "@/hooks";

const MyComponent = () => {
  const { data, loading, error, execute } = useGetRequest<User[]>();

  useEffect(() => {
    execute("/users");
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      {data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### With Query Parameters

```typescript
const { data, loading, error, execute } = useGetRequest<Product[]>();

const fetchProducts = async () => {
  await execute("/products", {
    params: {
      category: "electronics",
      limit: 10
    }
  });
};
```

## usePostRequest

Create new resources.

### Basic Usage

```typescript
import { usePostRequest } from "@/hooks";

const CreateUserForm = () => {
  const { data, loading, error, execute } = usePostRequest<User>();

  const handleSubmit = async (formData: CreateUserDto) => {
    const result = await execute("/users", formData);
    if (result) {
      console.log("User created:", result);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({ name: "John", email: "john@example.com" });
    }}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

### With Custom Headers

```typescript
const { execute } = usePostRequest<UploadResponse>();

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  await execute("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
```

## usePutRequest

Update existing resources.

### Basic Usage

```typescript
import { usePutRequest } from "@/hooks";

const UpdateUserForm = ({ userId }: { userId: string }) => {
  const { data, loading, error, execute } = usePutRequest<User>();

  const handleUpdate = async (updates: Partial<User>) => {
    const result = await execute(`/users/${userId}`, updates);
    if (result) {
      console.log("User updated:", result);
    }
  };

  return (
    <button onClick={() => handleUpdate({ name: "Jane Doe" })} disabled={loading}>
      {loading ? "Updating..." : "Update User"}
    </button>
  );
};
```

## useDeleteRequest

Delete resources.

### Basic Usage

```typescript
import { useDeleteRequest } from "@/hooks";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const { loading, error, execute } = useDeleteRequest();

  const handleDelete = async () => {
    const result = await execute(`/users/${userId}`);
    if (result) {
      console.log("User deleted successfully");
    }
  };

  return (
    <>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete User"}
      </button>
      {error && <div className="error">{error}</div>}
    </>
  );
};
```

## Advanced Usage

### Reset Hook State

All hooks provide a `reset()` function to clear data, error, and loading states:

```typescript
const { data, error, execute, reset } = useGetRequest<User>();

// Clear the state
const handleClear = () => {
  reset();
};
```

### Multiple Requests in One Component

```typescript
const UserManagement = () => {
  const getUsers = useGetRequest<User[]>();
  const createUser = usePostRequest<User>();
  const updateUser = usePutRequest<User>();
  const deleteUser = useDeleteRequest();

  useEffect(() => {
    getUsers.execute("/users");
  }, []);

  const handleCreate = async (userData: CreateUserDto) => {
    await createUser.execute("/users", userData);
    // Refresh the list
    getUsers.execute("/users");
  };

  // ... rest of the component
};
```

### Custom Error Handling

```typescript
const { execute } = usePostRequest<LoginResponse>();

const handleLogin = async (credentials: LoginDto) => {
  const result = await execute("/auth/login", credentials);
  
  if (result?.token) {
    // Store the token in localStorage
    localStorage.setItem("token", result.token);
    // Future requests will automatically include this token
  }
};
```

## Token Management

### Setting the Token

After a successful login, store the token in localStorage:

```typescript
localStorage.setItem("token", "your-jwt-token-here");
```

All subsequent requests using the custom hooks will automatically include this token in the Authorization header.

### Removing the Token

On logout:

```typescript
localStorage.removeItem("token");
```

The Axios interceptor will also automatically remove the token on 401 Unauthorized responses.

## Environment Variables

Configure the base API URL in your `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

If not set, it defaults to `http://localhost:3000/api`.

## TypeScript Support

All hooks support generic types for type-safe responses:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const { data } = useGetRequest<User[]>();
// data is typed as User[] | null
```

## Error Handling

All hooks provide consistent error handling:
- `error`: String containing the error message
- Errors from Axios responses include server-provided messages when available
- 401 errors automatically clear the stored token

