import { error } from '@sveltejs/kit'
import { getShopifyApi, postShopifyApi } from '$lib/utils/server'
import { serializeNonPOJOs } from '$lib/utils/validations'
import type { AllProducts, Error, Product } from '$lib/types'

// Search product

export const searchProducts = async ({
	origin,
	query,
	searchData,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: AllProducts | {} = {}
		let products: Product[] = []
		let count = 0
		let facets = ''
		let pageSize = 0
		let category = ''
		let err = ''

		res = await postShopifyApi(`products/search?q=${searchData}`, {}, sid)
		products = res?.products
		count = res?.count
		facets = res?.facets || []
		pageSize = res?.pageSize || 25

		return { products, count, facets, pageSize, err }
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}

// Fetch all products

export const fetchProducts = async ({ origin, slug, id, server = false, sid = null }: any) => {
	try {
		let res: AllProducts | {} = {}

		const med = (await getShopifyApi(`products`, {}, sid)).product
		// res = mapShopifyAllProducts(med)

		return res?.data || []
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}

// Fetch single product

export const fetchProduct = async ({ origin, slug, id, server = false, sid = null }: any) => {
	try {
		let res: Product | {} = {}

		const med = (await getShopifyApi(`products/${id}`, {}, sid)).product
		// res = mapShopifyProduct(med)

		return res || {}
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}

// Fetch products based on category

export const fetchProductsOfCategory = async ({
	origin,
	storeId,
	query,
	categorySlug,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		let products: Product[] = []
		let count = 0
		let facets = ''
		let pageSize = 0
		let category = ''
		let err = ''

		res = await getShopifyApi(`products`, {}, sid)
		count = res?.count
		// products = res?.products.map((p) => mapShopifyProduct(p))
		const offset = res?.offset
		const limit = res?.limit

		return { products, count, facets, pageSize, category, err }
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}

// Fetch next product

export const fetchNextPageProducts = async ({
	origin,
	storeId,
	categorySlug,
	server = false,
	nextPage,
	searchParams = {},
	sid = null
}: any) => {
	try {
		let nextPageData = []
		let res: any = {}

		res = await getShopifyApi(`customers/me`, {}, sid)

		return {
			nextPageData: nextPageData || [],
			count: res.count,
			estimatedTotalHits: res.estimatedTotalHits,
			facets: res.facets
		}
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}

// Fetch related products

export const fetchRelatedProducts = async ({
	origin,
	storeId,
	categorySlug,
	pid,
	server = false,
	sid = null
}: any) => {
	try {
		let relatedProductsRes: any = {}
		let relatedProducts: Product[] = []

		relatedProducts = await getShopifyApi(`customers/me`, {}, sid)

		return relatedProducts || []
	} catch (e) {
		error(e.status, e.data?.message || e.message)
	}
}
