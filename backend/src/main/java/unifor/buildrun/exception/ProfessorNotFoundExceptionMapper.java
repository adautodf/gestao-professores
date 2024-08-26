package unifor.buildrun.exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ProfessorNotFoundExceptionMapper implements ExceptionMapper<ProfessorNotFoundException> {

    @Override
    public Response toResponse(ProfessorNotFoundException exception){
        return Response.status(Response.Status.NOT_FOUND.getStatusCode(), "Professor não encontrado!").build();
    }
}
