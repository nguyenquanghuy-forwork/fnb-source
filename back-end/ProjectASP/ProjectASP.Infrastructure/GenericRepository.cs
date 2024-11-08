using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;
using System.Linq.Expressions;

namespace ProjectASP.Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T>, IDisposable where T : class
    {
        protected GoFnbSocialDbContext _dbContext;
        internal DbSet<T> dbSet;

        public GenericRepository(
        GoFnbSocialDbContext dbContext)
        {
            _dbContext = dbContext;
            dbSet = dbContext.Set<T>();
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> GetPagedReponseAsync(int pageNumber, int pageSize)
        {
            return await dbSet
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            _dbContext.AddRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task ModifyAsync(T entity)
        {
            _dbContext.Attach(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateRangeAsync(IEnumerable<T> entities)
        {
            _dbContext.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateRangeAsyncAsNoTracking(IEnumerable<T> entities)
        {
            _dbContext.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ModifyRangeAsync(IEnumerable<T> entities)
        {
            _dbContext.AttachRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            dbSet.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveRangeAsync(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllReadOnlyAsync()
        {
            return await dbSet.ToListAsync();
        }

        public IQueryable<T> GetAll()
        {
            return dbSet.AsQueryable();
        }

        public IQueryable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return dbSet.Where(predicate).AsQueryable();
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            return dbSet.Where(predicate);
        }

        public IQueryable<T> FromSqlRaw(string sql, params object[] parameters)
        {
            return dbSet.FromSqlRaw(sql, parameters);
        }

        public IQueryable<T> FromSql(FormattableString sql) => dbSet.FromSql(sql);

        public int ExecuteSql(string sql)
        {
            return _dbContext.Database.ExecuteSqlRaw(sql);
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void AddRange(IEnumerable<T> entities)
        {
            if (entities.Any())
            {
                _dbContext.AddRange(entities);
            }
        }

        public void AddRange(bool conditionPassed, IEnumerable<T> entities)
        {
            if (conditionPassed)
            {
                _dbContext.AddRange(entities);
            }
        }

        public void Update(T entity)
        {
            dbSet.Update(entity);
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            _dbContext.UpdateRange(entities);
        }

        public void Modify(T entity)
        {
            dbSet.Attach(entity);
        }

        public void ModifyRange(IEnumerable<T> entities)
        {
            _dbContext.AttachRange(entities);
        }

        public void Remove(T entity)
        {
            _dbContext.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            dbSet.RemoveRange(entities);
        }

        public void Dispose()
        {
            if (_dbContext != null)
            {
                _dbContext.Dispose();
            }
        }


    }

}
