import { getBigcommerceApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchVendor = async ({ origin, id, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		res = await getBigcommerceApi(`customers/me`)
		return res.data || []
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}

export const fetchProductsOfVendor = async ({
	origin,
	id,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getBigcommerceApi(`customers/me`)

		return res.data || []
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}
