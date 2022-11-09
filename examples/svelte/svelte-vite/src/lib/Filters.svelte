<script>
    export let filters;
</script>

<div>
    <ul>
        {#each filters as filter}
            <li>{filter.label}</li>
        {/each}
    </ul>
</div>