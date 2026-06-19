import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { Priority, Status } from '../generated/prisma/enums';
import { PrismaClient } from '../generated/prisma/client';

const dbUrl = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: dbUrl.port ? parseInt(dbUrl.port, 10) : 3306,
  user: dbUrl.username,
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.slice(1),

  connectionLimit: 10,
});

// 3. Instantiate your Client
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(' Trực tiếp dọn dẹp dữ liệu cũ...');
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  console.log(' Đang tạo dữ liệu mẫu cho Users...');

  // Tạo 3 User mẫu
  const user1 = await prisma.user.create({
    data: {
      email: 'alex.dev@minijira.com',
      password_hash:
        '$2b$10$EpJXGZq4gV2.f1SgVbM9O.eM6yKkG7tXgqfW0eF1wB2c3d4e5f6g7', // Mock bcrypt hash
      name: 'Alex Nguyễn',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.manager@minijira.com',
      password_hash:
        '$2b$10$EpJXGZq4gV2.f1SgVbM9O.eM6yKkG7tXgqfW0eF1wB2c3d4e5f6g7',
      name: 'Jane Doe',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'bob.tester@minijira.com',
      password_hash:
        '$2b$10$EpJXGZq4gV2.f1SgVbM9O.eM6yKkG7tXgqfW0eF1wB2c3d4e5f6g7',
      name: 'Bob Trần',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    },
  });

  console.log(' Đang tạo dữ liệu mẫu cho Tasks...');

  const tasksData = [
    {
      title: 'Thiết kế giao diện bảng Kanban',
      description:
        'Phác thảo giao diện kéo thả cho các cột Backlog, Todo, In Progress, Done.',
      priority: Priority.high,
      status: Status.in_progress,
      position: 'M',
      created_by: user2.id, // Jane tạo
      assignee_id: user1.id, // Giao cho Alex làm
      due_date: new Date('2026-07-01'),
    },
    {
      title: 'Cấu hình kết nối cơ sở dữ liệu MySQL',
      description: 'Setup Prisma Client, tối ưu hóa các index cho bảng Task.',
      priority: Priority.critical,
      status: Status.done,
      position: 'M',
      created_by: user1.id, // Alex tự tạo
      assignee_id: user1.id, // Alex tự làm
      due_date: new Date('2026-06-25'),
    },
    {
      title: 'Viết Unit Test cho Auth Module',
      description: 'Đảm bảo test cover > 80% cho các luồng Login, Register.',
      priority: Priority.medium,
      status: Status.todo,
      position: 'M',
      created_by: user2.id, // Jane tạo
      assignee_id: user3.id, // Giao cho Bob Tester
      due_date: new Date('2026-07-10'),
    },
    {
      title: 'Nghiên cứu kiến trúc Realtime với Socket.io',
      description:
        'Phục vụ việc cập nhật vị trí task realtime khi có người kéo thả.',
      priority: Priority.low,
      status: Status.backlog,
      position: 'M',
      created_by: user1.id,
      assignee_id: null, // Chưa giao cho ai
      due_date: null,
    },
    {
      title: 'Fix bug lỗi hiển thị sai định dạng Date',
      description:
        'Sửa lỗi timezone hiển thị trên giao diện của client lệch 7 tiếng.',
      priority: Priority.high,
      status: Status.todo,
      position: 'N', // Đứng thứ 2 trong cột Todo
      created_by: user3.id,
      assignee_id: user1.id,
      due_date: new Date('2026-06-30'),
    },
  ];

  // Chạy vòng lặp tạo các Task
  for (const task of tasksData) {
    await prisma.task.create({ data: task });
  }

  console.log('🚀 Seed dữ liệu thành công mỹ mãn!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
