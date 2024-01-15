import getWikiResults from "@/lib/getWikiResults";
import Items from "./components/Items";

type Props = {
  params: {
    searchText: string;
  };
};


export async function generateMetaData({ params: { searchText } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchText)
    const data = await wikiData 
    const displayTerm=  searchText.replaceAll('%20','');
    if (!data?.query?.pages)
    {
        return {
            title:`${displayTerm} Not Found`
        }
    }
    return {
        title:displayTerm,
        description:`Search results for ${displayTerm}`
    }
}

export default async function SearchResults({ params: { searchText } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchText)
    const data = await wikiData
    const results: Result[] | undefined = data?.query?.pages


    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {results
                ? Object.values(results).map(result => {
                    return <Items key={result.pageid} result={result} />
                    
                })
                : <h2 className="p-2 text-xl">{`${searchText} Not Found`}</h2>
            }
        </main>
    )

    return content
}