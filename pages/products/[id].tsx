import ProductLayout from "@/components/product/layout"
import { Suspense } from "react"

export default function CategorySelect(){
    return(
      <>
        <Suspense fallback={<p>Loading...</p>}>
          <ProductLayout />
        </Suspense>
      </>
    )
}

