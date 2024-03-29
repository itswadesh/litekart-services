import { getMedusajsApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchVendor = async ({ origin, id, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
		res = await getMedusajsApi(`vendors/me`, {}, sid)
		return res.data || []
	} catch (e) {
		error(e.status, e.message)
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

		res = await getMedusajsApi(`vendors/me`, {}, sid)

		return res.data || []
	} catch (e) {
		error(e.status, e.message)
	}
}
