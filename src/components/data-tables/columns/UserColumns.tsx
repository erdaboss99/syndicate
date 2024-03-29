'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';

import { formatDate } from '@/lib/date';

import { UserRole, type User } from '@prisma/client';

import UserAvatar from '@/components/general/UserAvatar';
import UserRoleBadge from '@/components/general/UserBadge';
import { Button } from '@/components/ui/Button';
import UsersTableAction from '@/components/users/UsersTableAction';
import { LuArrowUpDown } from 'react-icons/lu';

export type UsersDataTableFields = Pick<
	User,
	'id' | 'name' | 'email' | 'role' | 'emailVerified' | 'lastSeen' | 'image'
>;

export const UserColumns: ColumnDef<UsersDataTableFields>[] = [
	{
		accessorKey: 'image',
		enableHiding: false,
		header: 'Avatar',
		cell: ({ row }) => {
			const user = row.original;

			return <UserAvatar src={user?.image!} />;
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Role
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const role = row.getValue('role') as UserRole;

			return (
				<UserRoleBadge
					role={role}
					badgeVariant='outline'
				/>
			);
		},
		filterFn: (row, _, id) => {
			return id.includes(row.getValue('role'));
		},
	},
	{
		accessorKey: 'emailVerified',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email verified
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			if (row.getValue('emailVerified') === null) return <div className='font-medium'>Not yet verified</div>;

			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.getValue('emailVerified')), 'writtenShortDate')}
					</Suspense>
				</time>
			);
		},
	},
	{
		accessorKey: 'lastSeen',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Last seen
					<LuArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<time className='font-medium'>
					<Suspense fallback={null}>
						{formatDate(new Date(row.getValue('lastSeen')), 'writtenShortDateTime')}
					</Suspense>
				</time>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const user = row.original;

			return <UsersTableAction user={user} />;
		},
	},
];
