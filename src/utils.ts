import ms, { StringValue } from 'ms';

export function sec(s: StringValue): number {
	return ms(s) / 1000;
}

export function toSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}
