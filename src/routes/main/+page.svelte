<script>
    import Banner from '$lib/components/banner.svelte'
    import { onMount, onDestroy } from 'svelte'
    import { goto } from '$app/navigation';

    // State of page
    let load = false

    // Changelog data
    let changelogData = new Array()
    let version

    onMount(() => {
        const cookie_value = document.cookie.split('; ').find(row => row.startsWith('sessionId='))?.split('=')[1]
        
        if (!cookie_value) {
            goto('/')
        }

        // Init page when it's loaded
        if (document.readyState === 'complete') 
        {
            initPage()
        } 

        else 
        {
            window.addEventListener('load', initPage)
        }
    })

    function initPage() {
      load = true
      handleChangelog()
    }

    const gotoChangelog = () => 
    {
        window.open('https://github.com/Mnichus3142/Time-Rush/blob/main/CHANGELOG.md', '_blank')
    }

    const handleChangelog = async () =>
    {
        try {
                const response = await fetch('/api/getChangelog/', {
                    method: 'POST'
                })

                if (response.ok)
                {
                    const responseData = await response.json()
                    const data = responseData.data.split('\n')
                    version = data[0].substr(3)
                    for (let i = 0; i < data.length; i++)
                    {
                        if (i > 0)
                        {
                            changelogData.push(data[i])
                        }
                    }

                    changelogData = [...changelogData]
                }    
            }
            
        catch (error) {
            console.error('Error:', error)
        }
    }
</script>

{#if load}
<body class="flex flex-col min-h-screen">
    <div class="row-start-1">
        <Banner></Banner>
    </div>
    <main class="flex-1 grid grid-cols-3 grid-rows-1 w-screen h-full">
        <!-- Quick TODO list -->
        <div class="col-start-1 row-start-1 p-3">
            <div class="border-2 border-solid border-third w-full h-full rounded-xl">
                <div class="grid grid-cols-2 grid-rows-1 font-basic text-xl text-third">
                    <p class="col-start-1">Quick To Do List</p>
                    <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="col-start-2">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                    </svg>
                </div>
            </div>
        </div>
        <!-- TODO: On top welcome screen and greetings for the time we have spend togeter
        TODO: On bottom today's weather for user localisation -->
        <div class="col-start-2 row-start-1">
            <div class="row-start-1">

            </div>
            <div class="row-start-2 flex flex-col">
                
            </div>
        </div>
        <!-- TODO: How much you have done today and how much should be done 
         TODO: Changelog and actual app version -->
        <div class="col-start-3 row-start-1 grid grid-cols-1 grid-rows-2">
            <div class="row-start-1">

            </div>
            <div class="row-start-2 flex flex-col justify-center place-items-center">
                <p class="text-3xl text-center border-2 border-secondary rounded-lg p-4 mb-6">Changelog<br>{version}</p>
                {#each changelogData as changelogItem}
                    <p>{changelogItem}</p>
                {/each}
            </div>
        </div>
    </main>
</body>
{/if}