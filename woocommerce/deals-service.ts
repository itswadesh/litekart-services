import { getWoocommerceApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import { error } from '@sveltejs/kit'

export const fetchDeals = async ({ origin, query, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = await getWoocommerceApi(`products`, {}, sid)

		return res || {}
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}
