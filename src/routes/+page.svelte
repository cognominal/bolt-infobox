<script>
  import { onMount } from 'svelte';
  import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '$lib/components/ui/command';
  import { fetchWikipediaPages } from '$lib/utils';

  let searchResults = [];
  let selectedPage = null;

  async function handleInput(event) {
    const searchTerm = event.target.value;
    if (searchTerm.length > 2) {
      searchResults = await fetchWikipediaPages(searchTerm);
    } else {
      searchResults = [];
    }
  }

  function handleSelect(page) {
    selectedPage = page;
    window.open(`https://en.wikipedia.org/?curid=${page.pageid}`, '_blank');
  }

  onMount(() => {
    const input = document.querySelector('input');
    if (input) input.focus();
  });
</script>

<svelte:head>
  <title>Wikipedia Search</title>
  <meta name="description" content="Search Wikipedia pages" />
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Wikipedia Search</h1>
  
  <div class="w-full max-w-lg mx-auto">
    <Command class="rounded-lg border shadow-md">
      <CommandInput placeholder="Search Wikipedia..." on:input={handleInput} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {#each searchResults as page}
            <CommandItem on:click={() => handleSelect(page)}>
              <span>{page.title}</span>
            </CommandItem>
          {/each}
        </CommandGroup>
      </CommandList>
    </Command>
  </div>

  {#if selectedPage}
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">{selectedPage.title}</h2>
      <p>{@html selectedPage.snippet}</p>
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(.cmdk-root) {
    @apply max-w-full;
  }
  :global(.cmdk-input) {
    @apply w-full border-none px-3 py-2 text-base;
  }
  :global(.cmdk-list) {
    @apply max-h-[300px] overflow-y-auto;
  }
  :global(.cmdk-item) {
    @apply cursor-pointer px-3 py-2 text-sm;
  }
  :global(.cmdk-item[aria-selected="true"]) {
    @apply bg-blue-100;
  }
</style>